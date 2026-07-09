import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Shield, TrendingUp, Users, BookOpen, Bot, PiggyBank, MapPin, Star,
  ChevronRight, Menu, X, Globe, Smartphone, CreditCard, Wallet,
  GraduationCap, Sprout, Heart, Building2, CheckCircle2,
  MessageCircle, Send, Phone, Mail, MapPinned, Sparkles, Target,
  HandCoins, BarChart3, Clock, Lock, Zap
} from 'lucide-react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Link } from 'react-router-dom';

export function LandingPage() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Sannu! Na yi maraba. Ina iya taimaka maka da kuɗinka. How can I help you with your finances today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.problem'), href: '#problem' },
    { name: t('nav.solution'), href: '#solution' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.howItWorks'), href: '#how-it-works' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    const botResponses = [
      'Na fahimci. Bari in taimaka maka tsara budget ɗinka. I understand. Let me help you plan your budget.',
      'Za ka iya adana aƙalla 10% na kuɗin shiga naka. You can save at least 10% of your income.',
      'Gadar Kuɗi yana ba ka damar yin ajiya cikin sauƙi. Gadar Kuɗi lets you save easily.',
      'Bari mu duba yadda za ka iya rage kashe kuɗi. Let me show you how to reduce spending.',
    ];
    const botMsg = { role: 'assistant', text: botResponses[Math.floor(Math.random() * botResponses.length)] };
    setChatMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput('');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-green flex items-center justify-center">
                <HandCoins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">{t('Gadar Kuɗi')} <span className="text-sm font-medium text-muted-foreground">{t('Financial Ladder')}</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
              <Link to="/auth/signup" className="px-4 py-2 rounded-lg bg-gradient-green text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                {t('nav.getStarted')}
              </Link>
              <LanguageSwitcher />
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border p-4 space-y-3">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2">
                {link.name}
              </a>
            ))}
            <Link to="/auth/signup" className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-green text-white text-sm font-semibold">
              {t('nav.getStarted')}
            </Link>
            <div className="mt-4 flex justify-center"><LanguageSwitcher /></div>
          </div>
        )}
      </nav>

      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('hero.bridging')}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}<br />
              <span className="text-gradient-gold">{t('hero.titleGold')}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup" className="px-8 py-4 rounded-xl bg-gradient-gold text-[#003319] font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
                {t('hero.startJourney')}
              </Link>
              <a href="#solution" className="px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-colors">
                {t('hero.learnMore')}
              </a>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: t('hero.stats.targetUsers'), value: '50M+' },
                { label: t('hero.stats.languages'), value: '4' },
                { label: t('hero.stats.statesCovered'), value: '19' },
                { label: t('hero.stats.agentNetwork'), value: '10K+' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#D4AF37]">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. The Problem */}
      <section id="problem" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">{t('problem.challenge')}</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">{t('problem.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('problem.subtitle')}
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: t('problem.unbanked.title'), desc: t('problem.unbanked.desc') },
                { icon: Globe, title: t('problem.languageBarrier.title'), desc: t('problem.languageBarrier.desc') },
                { icon: Lock, title: t('problem.trustDeficit.title'), desc: t('problem.trustDeficit.desc') },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Solution */}
      <section id="solution" className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Solution</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Gadar Kuɗi: The Bridge</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive digital financial platform designed for Northern Nigeria, speaking your language and understanding your needs.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div variants={fadeInUp} className="space-y-6">
                {[
                  { icon: Globe, title: 'Bilingual Platform', desc: 'Full Hausa and English support — every feature, every notification, every tutorial.' },
                  { icon: Shield, title: 'Sharia-Compliant Options', desc: 'Islamic finance products that align with cultural and religious values.' },
                  { icon: Smartphone, title: 'USSD & Mobile App', desc: 'Access services via smartphone app or USSD code — no internet required.' },
                  { icon: Users, title: 'Agent Network', desc: 'Trusted community agents who help you onboard and transact safely.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-green flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} className="relative">
                <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/dabc9401-c296-4ebd-a289-8b7e7b5fc99b/fintech-in-nigeria-79a6614b-1783583982382.webp" alt="Fintech in Nigeria" className="rounded-3xl shadow-2xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Key Features */}
      <section id="features" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Everything You Need</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful financial tools designed for farmers, entrepreneurs, students, and families.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: PiggyBank, title: 'Smart Savings', desc: 'Set goals, automate savings, and earn competitive returns on your deposits.' },
                { icon: CreditCard, title: 'Digital Payments', desc: 'Send and receive money instantly. Pay bills, buy airtime, and shop online.' },
                { icon: Bot, title: 'AI Assistant', desc: 'Get personalized financial advice in Hausa or English, 24/7.' },
                { icon: BookOpen, title: 'Financial Education', desc: 'Learn money management with interactive lessons in your language.' },
                { icon: MapPin, title: 'Agent Locator', desc: 'Find nearby POS agents and service points for cash-in/cash-out.' },
                { icon: BarChart3, title: 'Budget Tools', desc: 'Track income and expenses with simple visual budgeting tools.' },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeInUp} className="group p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Start in 3 Simple Steps</h2>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: Smartphone, title: 'Register Easily', desc: 'Sign up with your phone number via app or USSD. No bank account needed. Available in Hausa and English.' },
                { step: '02', icon: Shield, title: 'Verify & Connect', desc: 'Complete simple KYC verification. Connect with a nearby agent if you need in-person help.' },
                { step: '03', icon: Zap, title: 'Start Transacting', desc: 'Send money, save, pay bills, access credit, and grow your finances — all from one platform.' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="relative text-center">
                  <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center mx-auto mb-4 -mt-8">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {i < 2 && <ChevronRight className="hidden md:block absolute top-12 -right-4 w-8 h-8 text-primary/30" />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Why Northern Nigeria */}
      <section id="why-north" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Focus</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Why Northern Nigeria?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The North holds immense potential. We're building for the people who need financial inclusion the most.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp} className="space-y-6">
                {[
                  { icon: Sprout, title: 'Agricultural Economy', desc: 'Home to millions of farmers who need digital tools for crop financing, market access, and savings.' },
                  { icon: Heart, title: 'Women Entrepreneurs', desc: 'Supporting women-led businesses with micro-loans, savings groups, and financial literacy.' },
                  { icon: GraduationCap, title: 'Youth & Students', desc: 'Empowering the next generation with financial education and digital-first banking.' },
                  { icon: Building2, title: 'Small Businesses', desc: 'Enabling SMEs to accept digital payments, manage cash flow, and access business credit.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-gradient-green rounded-3xl p-8 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">Impact Numbers</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Adults without bank accounts in Northern Nigeria', value: '35M+' },
                    { label: 'Small businesses needing digital payments', value: '2M+' },
                    { label: 'Farmers without access to credit', value: '8M+' },
                    { label: 'Women entrepreneurs underserved', value: '5M+' },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                      <span className="text-sm text-white/80">{stat.label}</span>
                      <span className="text-xl font-bold text-[#D4AF37]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. Financial Education in Hausa */}
      <section id="education" className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Ilimin Kuɗi</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Financial Education in Hausa</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Koyi yadda za ka sarrafa kuɗinka. Learn how to manage your money with interactive lessons in your language.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Yadda Ake Adana Kuɗi', subtitle: 'How to Save Money', lessons: 12, icon: PiggyBank },
                { title: 'Fahimtar Bashin', subtitle: 'Understanding Credit', lessons: 8, icon: CreditCard },
                { title: 'Tsara Kasafin Kuɗi', subtitle: 'Budget Planning', lessons: 10, icon: BarChart3 },
                { title: 'Saka Hannun Jari', subtitle: 'Investment Basics', lessons: 15, icon: TrendingUp },
              ].map((course, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-2 bg-gradient-gold" />
                  <div className="p-6">
                    <course.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{course.subtitle}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8. AI Financial Assistant */}
      <section id="ai-assistant" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">AI-Powered</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Your Smart Financial Assistant</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ask questions in Hausa or English. Get instant, personalized financial guidance powered by AI.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
                <div className="p-4 bg-gradient-green flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Gadar AI Assistant</div>
                    <div className="text-white/70 text-xs">Online • Hausa & English</div>
                  </div>
                </div>
                <div className="h-80 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-secondary text-foreground rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                    placeholder="Ask about savings, budget, or credit..."
                    className="flex-1 px-4 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button onClick={handleChatSend} className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 9. Savings & Budget Tools */}
      <section id="savings" className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Save & Grow</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Savings & Budget Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take control of your finances with smart savings goals and easy budget tracking.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: 'Goal-Based Savings', desc: 'Set savings targets for school fees, business, emergencies, or personal goals. Track progress visually.', features: ['Auto-save rules', 'Progress tracking', 'Milestone rewards'] },
                { icon: Clock, title: 'Scheduled Transfers', desc: 'Automate your savings with daily, weekly, or monthly transfers. Build wealth without thinking about it.', features: ['Flexible schedules', 'Multiple goals', 'Interest earnings'] },
                { icon: BarChart3, title: 'Visual Budgeting', desc: 'See where your money goes with simple charts. Set spending limits and get alerts before overspending.', features: ['Category budgets', 'Spending alerts', 'Monthly reports'] },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 10. POS & Agent Locator */}
      <section id="pos-locator" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Find Agents</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">POS & Agent Locator</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find trusted Gadar Kuɗi agents near you for cash-in, cash-out, and in-person support.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-secondary rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                    <MapPinned className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Kano Central Market</div>
                      <div className="text-sm text-muted-foreground">0.3 km away • Open now</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                    <MapPinned className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Zaria Road Agent</div>
                      <div className="text-sm text-muted-foreground">1.2 km away • Open now</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                    <MapPinned className="w-6 h-6 text-[#D4AF37]" />
                    <div>
                      <div className="font-semibold">Sabon Gari POS</div>
                      <div className="text-sm text-muted-foreground">2.1 km away • Open now</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Cash In & Out Anywhere</h3>
                <p className="text-muted-foreground">
                  Our growing network of verified agents ensures you can always access your money. Whether you're in Kano, Kaduna, Jos, or any rural community — help is nearby.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Active Agents', value: '10,000+' },
                    { label: 'States Covered', value: '19' },
                    { label: 'Avg. Distance', value: '<2km' },
                    { label: 'Success Rate', value: '99.5%' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-secondary rounded-xl text-center">
                      <div className="text-xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Trusted by Thousands</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from real people whose lives have changed with Gadar Kuɗi.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Amina Ibrahim', role: 'Farmer, Kano', text: "Gadar Kuɗi ya taimake ni in adana kuɗi don iri. I saved enough for seeds this planting season. The Hausa interface makes everything easy for me.", avatar: '👩‍🌾' },
                { name: 'Musa Abdullahi', role: 'Small Business Owner, Kaduna', text: 'My shop now accepts digital payments through Gadar Kuɗi agents. My sales have increased by 40% since I started using the platform.', avatar: '👨‍💼' },
                { name: 'Fatima Usman', role: 'Student, ABU Zaria', text: "The financial education lessons taught me how to budget my allowance. I have saved ₦50,000 in 6 months using the smart savings feature!", avatar: '👩‍🎓' },
              ].map((testimonial, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 12. Call to Action */}
      <section id="cta" className="py-20 md:py-28 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Take Control of<br />Your Financial Future?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of Nigerians already using Gadar Kuɗi to save, grow, and manage their money. Start today — it's free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/auth/signup" className="px-8 py-4 rounded-xl bg-gradient-gold text-[#003319] font-bold text-lg hover:opacity-90 transition-opacity shadow-lg inline-flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                </Link>
                <a href="#contact" className="px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Talk to an Agent
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> No hidden fees</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Free to register</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Hausa & English</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> USSD available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 13. Contact */}
      <section id="contact" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Get In Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions? We're here to help. Reach out in Hausa or English.
              </p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeInUp} className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-muted-foreground">09158059744</p>
                    <p className="text-sm text-muted-foreground">Mon-Sat, 8am-8pm WAT</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-muted-foreground">ahmadzahraddeen17@gmail.com</p>
                    <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground">09158059744</p>
                    <p className="text-sm text-muted-foreground">Chat with us anytime</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPinned className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office</h4>
                    <p className="text-muted-foreground">12 Bompai Road, Kano</p>
                    <p className="text-sm text-muted-foreground">Kano State, Nigeria</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <form className="space-y-4 bg-card rounded-2xl border border-border p-8">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Full Name</label>
                      <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone Number</label>
                      <input type="tel" placeholder="+234..." className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message / Saƙo</label>
                    <textarea rows={4} placeholder="Tell us how we can help... / Gaya mana yadda za mu taimaka..." className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                  </div>
                  <button type="button" className="w-full py-3 rounded-xl bg-gradient-green text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <HandCoins className="w-4 h-4 text-[#003319]" />
                </div>
                <span className="text-lg font-bold">Gadar Kuɗi <span className="text-sm font-medium text-background/60">(Financial Ladder)</span></span>
              </div>
              <p className="text-sm text-background/70">
                Haɗa Kowa da Damar Kuɗi.<br />
                Bridging the financial inclusion gap in Nigeria.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#features" className="hover:text-[#D4AF37] transition-colors">Features</a></li>
                <li><a href="#savings" className="hover:text-[#D4AF37] transition-colors">Savings</a></li>
                <li><a href="#ai-assistant" className="hover:text-[#D4AF37] transition-colors">AI Assistant</a></li>
                <li><a href="#pos-locator" className="hover:text-[#D4AF37] transition-colors">Agent Locator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#problem" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                <li><a href="#why-north" className="hover:text-[#D4AF37] transition-colors">Our Mission</a></li>
                <li><a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              © 2024 Gadar Kuɗi. All rights reserved. Licensed by CBN.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-background/50 flex items-center gap-1">
                <Shield className="w-3 h-3" /> PCI DSS Compliant
              </span>
              <span className="text-xs text-background/50 flex items-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit Encryption
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
