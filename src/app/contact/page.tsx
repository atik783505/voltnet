import React from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin } from 'lucide-react';

export default function ContactSection() {
    const phoneNumber = "01600690954";
    const whatsappLink = `https://wa.me/8801938865142`;
    const emailAddress = "atik13672@gmail.com"; 

    return (
        <section className="bg-white border-y border-slate-100 py-16 sm:py-24 text-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Personal Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
                                Get In Touch
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Let’s Talk About Your EV Projects
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
                                Have questions about our EV Charging Station Platform or want to collaborate on smart grid solutions? Feel free to reach out directly.
                            </p>
                        </div>

                        {/* Contact Channels */}
                        <div className="space-y-4">
                            {/* Phone Card */}
                            <a 
                                href={`tel:${phoneNumber}`}
                                className="flex items-center gap-4 p-4 bg-slate-50/60 border border-slate-150 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 transition duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Call Directly</p>
                                    <p className="font-bold text-slate-900 text-sm sm:text-base">{phoneNumber}</p>
                                </div>
                            </a>

                            {/* WhatsApp Card */}
                            <a 
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-slate-50/60 border border-slate-150 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 transition duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                    <MessageCircle className="w-5 h-5 fill-emerald-50" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Chat on WhatsApp</p>
                                    <p className="font-bold text-slate-900 text-sm sm:text-base">Send a Message</p>
                                </div>
                            </a>

                            {/* Email Card */}
                            <a 
                                href={`mailto:${emailAddress}`}
                                className="flex items-center gap-4 p-4 bg-slate-50/60 border border-slate-150 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 transition duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email Us</p>
                                    <p className="font-bold text-slate-900 text-sm sm:text-base break-all">{emailAddress}</p>
                                </div>
                            </a>

                            {/* Location Card */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50/60 border border-slate-150 rounded-2xl">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 shadow-sm">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Location</p>
                                    <p className="font-bold text-slate-900 text-sm sm:text-base">Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Send a Message</h3>
                        <p className="text-xs text-slate-500 mb-6">
                            Fill out the form below and I will get back to you as soon as possible.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Your Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Subject</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Partnership Opportunity" 
                                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Message</label>
                                <textarea 
                                    rows={5}
                                    placeholder="Write your message here..." 
                                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 px-4 rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
}