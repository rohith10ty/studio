import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Search,
  ArrowLeft,
  Image,
  Smile,
  Phone,
  Video,
  MoreVertical,
  CheckCheck
} from 'lucide-react';

export default function MessagesView() {
  const {
    conversations,
    activeChatId,
    setActiveChatId,
    sendMessage,
    currentUser,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [chatSearch, setChatSearch] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat =
    conversations.find(c => c.id === activeChatId) || conversations[0];

  const filteredConversations = conversations.filter(c =>
    c.user.name.toLowerCase().includes(chatSearch.toLowerCase()) ||
    c.user.handle.toLowerCase().includes(chatSearch.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText);
    setInputText('');
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] md:h-[calc(100vh-60px)] rounded-3xl bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/70 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 overflow-hidden flex select-none shadow-studio-subtle animate-fade-in">
      {/* Left Chat List Column */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 flex flex-col ${
          isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Header & Search */}
        <div className="p-4 flex flex-col gap-3 border-b border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
              Studio Messages
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext font-medium">
              {conversations.length} Active
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-studio-dark-bg/50 dark:bg-studio-dark-bg/50 light:bg-studio-light-bg/50 border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40 text-xs text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none"
            />
          </div>
        </div>

        {/* Conversations Scrollable List */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {filteredConversations.map(chat => {
            const isSelected = chat.id === activeChat.id;
            const lastMsg = chat.messages[chat.messages.length - 1];

            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setIsMobileChatOpen(true);
                }}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border/60 dark:border-studio-dark-border/60 light:border-studio-light-border shadow-sm'
                    : 'hover:bg-studio-dark-bg/40 dark:hover:bg-studio-dark-bg/40 light:hover:bg-studio-light-bg/50'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative shrink-0">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-studio-dark-border/30"
                    />
                    {chat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-studio-dark-card" />
                    )}
                  </div>

                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
                      {chat.user.name}
                    </span>
                    <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
                      {lastMsg ? lastMsg.text : 'Start collaborating...'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                    {lastMsg?.time || ''}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Thread Column */}
      <div
        className={`flex-1 flex flex-col bg-studio-dark-bg/30 dark:bg-studio-dark-bg/30 light:bg-studio-light-bg/40 ${
          !isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeChat ? (
          <>
            {/* Active Chat Header */}
            <div className="p-4 border-b border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40 flex items-center justify-between bg-studio-dark-card/40 dark:bg-studio-dark-card/40 light:bg-studio-light-card/50">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileChatOpen(false)}
                  className="md:hidden p-1.5 rounded-xl hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img
                    src={activeChat.user.avatar}
                    alt={activeChat.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-studio-dark-border/40"
                  />
                  {activeChat.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-studio-dark-card" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                    {activeChat.user.name}
                  </span>
                  <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                    {activeChat.user.isOnline ? 'Active on Studio' : activeChat.user.lastSeen}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                <button className="p-2 rounded-xl hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Flow Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3">
              {activeChat.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] sm:max-w-[70%] ${
                      isMe ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white rounded-br-sm'
                          : 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext mt-1 px-1 flex items-center gap-1">
                      {msg.time}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-400 inline" />}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={handleSend}
              className="p-3 sm:p-4 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40 flex items-center gap-2 bg-studio-dark-card/40 dark:bg-studio-dark-card/40 light:bg-studio-light-card/50"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${activeChat.user.name.split(' ')[0]}...`}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none focus:border-studio-dark-border dark:focus:border-studio-dark-text light:focus:border-studio-light-text"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white font-semibold text-xs disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md shrink-0"
              >
                <span className="hidden sm:inline">Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-studio-dark-muted">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
