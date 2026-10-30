import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Search,
  ArrowLeft,
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
    <div
      data-lenis-prevent
      className="w-full h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] rounded-2xl bg-studio-card border border-studio-border/50 overflow-hidden flex select-none shadow-studio-subtle animate-fade-in"
    >
      {/* Left Chat List */}
      <div
        data-lenis-prevent
        className={`w-full md:w-72 lg:w-80 border-r border-studio-border/40 flex flex-col ${
          isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="p-3.5 flex flex-col gap-2.5 border-b border-studio-border/30">
          <h2 className="text-sm font-semibold text-studio-text font-outfit">
            Messages
          </h2>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-studio-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-studio-bg/50 border border-studio-border/40 text-xs text-studio-text placeholder-studio-muted focus:outline-none"
            />
          </div>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto p-1.5 flex flex-col gap-0.5">
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
                className={`p-2.5 rounded-xl flex items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-studio-bg border border-studio-border/50'
                    : 'hover:bg-studio-bg/40'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="relative shrink-0">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-studio-border/30"
                    />
                    {chat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-studio-card" />
                    )}
                  </div>

                  <div className="flex flex-col truncate">
                    <span className="font-medium text-xs text-studio-text truncate">
                      {chat.user.name}
                    </span>
                    <span className="text-[11px] text-studio-muted truncate">
                      {lastMsg ? lastMsg.text : 'No messages'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-studio-muted">
                    {lastMsg?.time || ''}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Thread */}
      <div
        className={`flex-1 flex flex-col bg-studio-bg/20 ${
          !isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-3 border-b border-studio-border/30 flex items-center justify-between bg-studio-card/30">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsMobileChatOpen(false)}
                  className="md:hidden p-1 rounded-lg text-studio-text"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="relative">
                  <img
                    src={activeChat.user.avatar}
                    alt={activeChat.user.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-studio-border/30"
                  />
                  {activeChat.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-studio-card" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-xs text-studio-text">
                    {activeChat.user.name}
                  </span>
                  <span className="text-[10px] text-studio-muted">
                    {activeChat.user.isOnline ? 'Online' : activeChat.user.lastSeen}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5"
            >
              {activeChat.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      isMe ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`px-3.5 py-2 rounded-xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-studio-btn-bg text-studio-btn-text'
                          : 'bg-studio-card text-studio-text border border-studio-border/50'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-studio-muted mt-0.5 px-1 flex items-center gap-1">
                      {msg.time}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-500 inline" />}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-studio-border/30 flex items-center gap-2 bg-studio-card/40"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text placeholder-studio-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-studio-btn-bg text-studio-btn-text disabled:opacity-40 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-studio-muted">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
