import React from 'react';
import { motion } from 'framer-motion';

const MobileMockup = () => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden ring-4 ring-cyan-500/30">
      
      {/* Notch */}
      <div className="w-[148px] h-[18px] bg-gray-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] z-20"></div>

      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-950 relative flex flex-col font-sans">
        
        {/* App Header */}
        <div className="pt-10 pb-4 px-6 relative z-10 bg-slate-900 border-b border-white/5 flex justify-between items-center">
            <div>
                <h3 className="text-white text-lg font-bold">BNB Dafatery</h3>
                <p className="text-cyan-400 text-xs">Personal Finance</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full border border-white/20"></div>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-24 scrollbar-hide">
            
            {/* Balance Card */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-cyan-900/80 to-blue-900/60 rounded-2xl p-5 border border-cyan-500/30 shadow-lg shadow-cyan-900/20 backdrop-blur-md"
            >
                <div className="text-white/70 text-sm mb-1">Total Balance</div>
                <div className="text-3xl font-bold text-white mb-4">$12,450.00</div>
                
                <div className="flex justify-between items-center text-xs">
                    <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md flex items-center">
                        <span className="mr-1">↑</span> Income
                    </div>
                    <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded-md flex items-center">
                        <span className="mr-1">↓</span> Expense
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="flex justify-between px-2"
            >
                {['Transfer', 'Pay', 'Top Up', 'More'].map((action, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 hover:bg-slate-700 transition">
                            <div className="w-5 h-5 rounded bg-cyan-400/20"></div>
                        </div>
                        <span className="text-[10px] text-slate-400">{action}</span>
                    </div>
                ))}
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.6 }}
            >
                <div className="flex justify-between items-end mb-4 px-1">
                    <h4 className="text-white text-sm font-semibold">Transactions</h4>
                    <span className="text-cyan-400 text-xs">See All</span>
                </div>
                
                <div className="space-y-3">
                    {[
                        { title: 'Grocery', time: 'Today', amount: '-$45.00', icon: 'bg-orange-500/20 text-orange-400', color: 'text-white' },
                        { title: 'Salary', time: 'Yesterday', amount: '+$3,200.00', icon: 'bg-emerald-500/20 text-emerald-400', color: 'text-emerald-400' },
                        { title: 'Netflix', time: 'Oct 12', amount: '-$15.99', icon: 'bg-red-500/20 text-red-400', color: 'text-white' }
                    ].map((tx, idx) => (
                        <div key={idx} className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.icon}`}>
                                    <div className="w-4 h-4 rounded bg-current opacity-50"></div>
                                </div>
                                <div>
                                    <div className="text-white text-sm">{tx.title}</div>
                                    <div className="text-slate-500 text-[10px]">{tx.time}</div>
                                </div>
                            </div>
                            <div className={`font-semibold text-sm ${tx.color}`}>
                                {tx.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full h-16 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex justify-around items-center px-4 z-20">
            {['Home', 'Stats', 'Cards', 'Profile'].map((nav, i) => (
                <div key={i} className={`flex flex-col items-center space-y-1 ${i === 0 ? 'text-cyan-400' : 'text-slate-500'}`}>
                    <div className={`w-5 h-5 rounded ${i === 0 ? 'bg-cyan-400' : 'bg-slate-600'}`}></div>
                    <span className="text-[9px]">{nav}</span>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default MobileMockup;
