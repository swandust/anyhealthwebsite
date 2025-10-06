import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, Headphones } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'contact@anyhealth.asia',
      action: 'mailto:contact@anyhealth.asia'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
      contact: 'Available 24/7',
      action: '#'
    },

    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Technical Support',
      description: 'Platform assistance',
      contact: 'Get help now',
      //action: '#'
    }
  ];



  return (
    <div className="pt-0 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 animate-pulse" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 lg:px-8">
          <div className="text-center mb-16">
        <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Have questions about AnyHEALTH? We're here to help you navigate your healthcare journey.
        </p>
          </div>

          {/* Contact Methods */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.action}
            className="group p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 w-full max-w-xs flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
          {method.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 text-center">{method.title}</h3>
            <p className="text-white/60 text-sm mb-3 text-center">{method.description}</p>
            <p className="text-[#4E9A82] font-medium text-center">{method.contact}</p>
          </a>
        ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
          <div className="gap-12">
            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#4E9A82] transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#4E9A82] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/50 focus:outline-none focus:border-[#4E9A82] transition-colors"
                  >
                    <option value="general" className="text-black">General Inquiry</option>
                    <option value="support" className="text-black">Technical Support</option>
                    <option value="partnership" className="text-black">Partnership</option>
                    <option value="demo" className="text-black">Request Demo</option>
                    <option value="billing" className="text-black">Billing Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#4E9A82] transition-colors"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#4E9A82] transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            

              

              
          
          </div>
        </div>
      </section>
    </div>
  );
}
 