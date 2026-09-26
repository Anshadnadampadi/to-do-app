import React from 'react';
import { ChevronRight, Box, Briefcase, Compass, Users } from 'lucide-react';
import { SparkleStar } from '../components/SparkleStar';
import { AvatarStack } from '../components/AvatarStack';

export const ScreenOnboarding = ({ onGetStarted }) => {
  return (
    <div className="relative flex-1 flex flex-col justify-between px-6 pt-2 pb-8 overflow-hidden select-none bg-gradient-to-b from-[#0e1017] via-[#090a0f] to-[#07080b]">
      {/* Background radial glow */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-yellow-400/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Orbit & Floating 3D Cards Visual Area */}
      <div className="relative w-full h-[340px] flex items-center justify-center pt-2">
        {/* Orbit Rings (SVG) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full opacity-35" viewBox="0 0 320 320">
            <ellipse cx="160" cy="160" rx="140" ry="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 4" transform="rotate(-15 160 160)" />
            <ellipse cx="160" cy="160" rx="110" ry="50" fill="none" stroke="rgba(215,254,3,0.3)" strokeWidth="1.2" transform="rotate(25 160 160)" />
            <ellipse cx="160" cy="160" rx="80" ry="35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </svg>
        </div>

        {/* Orbit Node Icons */}
        <div className="absolute top-10 right-16 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 border border-white/10">
          <Box size={13} />
        </div>
        <div className="absolute bottom-14 left-10 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 border border-white/10">
          <Briefcase size={13} />
        </div>
        <div className="absolute top-36 left-4 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 border border-white/10">
          <Compass size={13} />
        </div>

        {/* Card 1: Development (Left tilt) */}
        <div
          className="absolute left-1 top-8 w-44 p-3 rounded-2xl bg-gradient-to-b from-[#1c1f2b]/95 to-[#12141c]/90 border border-white/15 shadow-[0_16px_32px_rgba(0,0,0,0.85)] transform -rotate-12 hover:-rotate-6 transition-all duration-300 z-20 cursor-pointer"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-yellow-400/20 text-[#d7fe03] flex items-center justify-center text-[10px]">
              <Box size={12} />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">Development</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1 font-medium">Joined Members</div>
          <AvatarStack
            members={[
              { name: "Maddox", avatar: "/assets/maddox_avatar.jpg" },
              { name: "Sarah Chen", avatar: "/avatars/avatar_sarah.jpg" }
            ]}
            extraCount={10}
            size={22}
          />
        </div>

        {/* Card 2: Portfolio (Center-right tilt) */}
        <div
          className="absolute right-6 top-16 w-44 p-3 rounded-2xl bg-gradient-to-b from-[#212534]/95 to-[#141722]/90 border border-white/15 shadow-[0_18px_36px_rgba(0,0,0,0.9)] transform rotate-6 hover:rotate-2 transition-all duration-300 z-30 cursor-pointer"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-white/10 text-white flex items-center justify-center text-[10px]">
              <Briefcase size={12} />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">Portfolio</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1 font-medium">Joined Members</div>
          <AvatarStack
            members={[
              { name: "Marcus Lee", avatar: "/avatars/avatar_marcus.jpg" },
              { name: "Sarah Chen", avatar: "/avatars/avatar_sarah.jpg" }
            ]}
            extraCount={8}
            size={22}
          />
        </div>

        {/* Card 3: Discovery (Bottom-right tilt) */}
        <div
          className="absolute right-2 bottom-6 w-44 p-3 rounded-2xl bg-gradient-to-b from-[#1b1e2a]/90 to-[#10121a]/95 border border-white/15 shadow-[0_16px_32px_rgba(0,0,0,0.85)] transform -rotate-3 hover:rotate-0 transition-all duration-300 z-20 cursor-pointer"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-yellow-400/20 text-[#d7fe03] flex items-center justify-center text-[10px]">
              <Compass size={12} />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">Discovery</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1 font-medium">Joined Members</div>
          <AvatarStack
            members={[
              { name: "Maddox", avatar: "/assets/maddox_avatar.jpg" },
              { name: "Marcus Lee", avatar: "/avatars/avatar_marcus.jpg" }
            ]}
            extraCount={5}
            size={22}
          />
        </div>
      </div>

      {/* Bottom Typography & CTA Button */}
      <div className="mt-2 flex flex-col">
        {/* Main Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight leading-[1.18] text-white">
          Your <span className="italic text-[#d7fe03] inline-flex items-center gap-1 font-black">Daily <SparkleStar size={24} /></span>
          <br />
          Productivity
          <br />
          <span className="italic font-bold">Starts</span> Here
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-[13px] leading-relaxed text-slate-400 font-normal max-w-[290px]">
          Plan tasks, stay focused, and achieve your goals with simple daily organization.
        </p>

        {/* Get Started Button */}
        <div className="mt-6 flex items-center">
          <button
            onClick={onGetStarted}
            className="w-full flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-[#171a26]/90 border border-white/15 hover:border-yellow-400/50 shadow-[0_12px_28px_rgba(0,0,0,0.7)] group transition-all duration-300"
          >
            <span className="text-sm font-semibold tracking-wide text-white group-hover:text-[#d7fe03] transition-colors">
              Get Started
            </span>
            <div className="w-11 h-11 rounded-full bg-[#d7fe03] text-[#090a0f] flex items-center justify-center shadow-[0_0_16px_rgba(215,254,3,0.45)] group-hover:scale-105 transition-transform">
              <ChevronRight size={22} strokeWidth={2.8} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
