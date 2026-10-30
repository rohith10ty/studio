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
      className="w-full h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] rounded-2xl bg-studio-card border-2 border-studio-border overflow-hidden flex select-none shadow-studio-card animate-fade-in"
    >
      {/* Left Chat List Column */}
      <div
        data-lenis-prevent
        className={`w-full md:w-72 lg:w-80 border-r-2 border-studio-border bg-studio-sidebar flex flex-col ${
          isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="p-3.5 flex flex-col gap-2.5 border-b-2 border-studio-border">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-studio-text font-outfit">
              Direct Messages
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-studio-card border border-studio-border text-studio-text">
              {conversations.length} Active
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-studio-text absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-studio-card border-2 border-studio-border text-xs font-bold text-studio-text placeholder-studio-subtext focus:outline-none focus:border-studio-borderStrong"
            />
          </div>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
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
                className={`p-2.5 rounded-xl flex items-center justify-between gap-2.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-studio-card border-2 border-studio-border shadow-sm'
                    : 'hover:bg-studio-card/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="relative shrink-0">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-studio-border"
                    />
                    {chat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-studio-card" />
                    )}
                  </div>

                  <div className="flex flex-col truncate">
                    <span className="font-bold text-xs text-studio-text truncate">
                      {chat.user.name}
                    </span>
                    <span className="text-[11px] text-studio-subtext font-medium truncate">
                      {lastMsg ? lastMsg.text : 'Start chatting...'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-studio-subtext font-bold">
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

      {/* Right Chat Thread Column */}
      <div
        className={`flex-1 flex flex-col bg-studio-canvas ${
          !isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-3 px-4 border-b-2 border-studio-border flex items-center justify-between bg-studio-sidebar">
              <div className="flex items-center gap-3">
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
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-studio-border"
                  />
                  {activeChat.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-studio-card" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-xs text-studio-text">
                    {activeChat.user.name}
                  </span>
                  <span className="text-[10px] text-studio-subtext font-bold">
                    {activeChat.user.isOnline ? 'Online now' : activeChat.user.lastSeen}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Flow */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
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
                      className={`px-4 py-2 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-studio-btn-dark text-studio-btn-darkText rounded-br-none'
                          : 'bg-studio-card text-studio-text border-2 border-studio-border rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-studio-subtext font-bold mt-1 px-1 flex items-center gap-1">
                      {msg.time}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-500 inline stroke-[2.5]" />}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t-2 border-studio-border flex items-center gap-2 bg-studio-sidebar"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-studio-card border-2 border-studio-border text-xs font-medium text-studio-text placeholder-studio-subtext focus:outline-none focus:border-studio-borderStrong"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 px-3 rounded-xl bg-studio-btn-dark text-studio-btn-darkText text-xs font-bold disabled:opacity-40 transition-all flex items-center gap-1 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-studio-subtext font-bold">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
