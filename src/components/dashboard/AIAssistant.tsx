import { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AIAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && isOpen) fetchMessages();
  }, [user, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      user_id: user?.id,
      role: 'user',
      message: input,
    };

    setMessages(prev => [...prev, { ...userMsg, created_at: new Date().toISOString() }]);
    setInput('');
    setLoading(true);

    try {
      await supabase.from('chat_messages').insert(userMsg);
      
      // Mock AI response
      const responses = [
        'Na fahimci tambayarku. Ga yadda za ku iya adana kuɗi...',
        'Ina iya taimaka maka ka rage kashe kudi ta hanyar...',
        'I can help you set up a savings goal for your business.',
        'Would you like to see your spending breakdown for this month?',
      ];
      const aiMsg = {
        user_id: user?.id,
        role: 'assistant',
        message: responses[Math.floor(Math.random() * responses.length)],
      };

      setTimeout(async () => {
        await supabase.from('chat_messages').insert(aiMsg);
        setMessages(prev => [...prev, { ...aiMsg, created_at: new Date().toISOString() }]);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-green shadow-2xl z-40"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-full max-w-[350px] h-[500px] bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col z-50"
          >
            <div className="p-4 bg-gradient-green flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Gadar Assistant</div>
                  <div className="text-[10px] text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-2">
                  <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto opacity-50" />
                  <p className="text-sm text-muted-foreground">Sannu! How can I help you today?</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm border border-border'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground rounded-2xl rounded-bl-sm border border-border p-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-card">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="rounded-xl bg-secondary border-none focus-visible:ring-1 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon" className="bg-gradient-green shrink-0">
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
