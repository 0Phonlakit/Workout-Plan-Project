/* ============================================================
 * PAGE: Home - Personal Workout Plan
 * Design: Premium Dark Slate + Amber Athletic UI
 * Fonts: Oswald (headers) + Nunito Sans (body)
 * ============================================================ */

import { useState } from 'react';
import { workoutSchedule, userProfile, equipment, nutritionTips, progressionPlan } from '@/data/workoutPlan';
import type { WorkoutDay } from '@/data/workoutPlan';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Flame, Calendar, ChevronDown, ChevronUp, Clock, Target, User, Zap, Heart, TrendingUp, Apple } from 'lucide-react';

// ---- Navbar ----
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-oswald text-lg font-semibold tracking-wider text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            FIT<span className="text-amber-400">PLAN</span> PRO
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:block">แผนเฉพาะบุคคล</span>
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-amber-400/30 flex items-center justify-center">
            <User className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}

// ---- Hero Section ----
function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[420px] flex items-end">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663726804223/guhunZ8GeeDDmA2n8qfiBN/hero-workout-5ZA2HbyEJMLid8aXr835oV.webp')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      {/* Grid texture overlay */}
      <div className="absolute inset-0 grid-texture opacity-20" />

      <div className="container relative z-10 pb-10 pt-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3 fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3 h-3" /> แผนเฉพาะบุคคล
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-3 fade-up fade-up-1"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            <span className="text-white">แผน</span>
            <span className="text-gradient-amber"> ออกกำลังกาย</span>
            <br />
            <span className="text-white">เฉพาะบุคคล</span>
          </h1>
          <p className="text-slate-300 text-base mb-6 fade-up fade-up-2 leading-relaxed">
            ออกแบบมาเพื่อ <strong className="text-amber-400">ปรับรูปร่าง</strong> สำหรับผู้ชาย อายุ 23 ปี
            ออกกำลังกายที่บ้าน 5 วัน Weight Training + 1 วัน Cardio
          </p>
          {/* Stats row */}
          <div className="flex flex-wrap gap-4 fade-up fade-up-3">
            {[
              { icon: <User className="w-4 h-4" />, label: 'อายุ', value: '23 ปี' },
              { icon: <Target className="w-4 h-4" />, label: 'น้ำหนัก', value: '75 กก.' },
              { icon: <TrendingUp className="w-4 h-4" />, label: 'BMI', value: '25.6' },
              { icon: <Zap className="w-4 h-4" />, label: 'ระดับ', value: 'มีประสบการณ์บ้าง' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2">
                <span className="text-amber-400">{stat.icon}</span>
                <div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                  <div className="text-sm font-semibold text-white">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Equipment Section ----
function EquipmentSection() {
  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container">
        <h2 className="text-xl font-bold text-white mb-5 fade-up" style={{ fontFamily: 'Oswald, sans-serif' }}>
          <span className="text-amber-400">อุปกรณ์</span> ที่มี
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {equipment.map((eq, i) => (
            <div
              key={eq.name}
              className={`card-hover bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center fade-up fade-up-${i + 1}`}
            >
              <div className="text-2xl mb-2">{eq.icon}</div>
              <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{eq.name}</div>
              <div className="text-xs text-slate-400">{eq.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Weekly Schedule Overview ----
function WeeklySchedule({ activeDay, setActiveDay }: { activeDay: string; setActiveDay: (id: string) => void }) {
  const dayColors = {
    strength: 'amber',
    cardio: 'teal',
    rest: 'slate',
  };

  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            <span className="text-amber-400">ตาราง</span> ประจำสัปดาห์
          </h2>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-slate-400">Weight Training</span></span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span><span className="text-slate-400">Cardio</span></span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span><span className="text-slate-400">Rest</span></span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {workoutSchedule.map((day, i) => {
            const isActive = activeDay === day.id;
            const color = dayColors[day.type];
            const borderColor = color === 'amber' ? 'border-amber-400' : color === 'teal' ? 'border-teal-400' : 'border-slate-600';
            const bgActive = color === 'amber' ? 'bg-amber-400/10' : color === 'teal' ? 'bg-teal-400/10' : 'bg-slate-700/30';
            const textColor = color === 'amber' ? 'text-amber-400' : color === 'teal' ? 'text-teal-400' : 'text-slate-400';
            const dotColor = color === 'amber' ? 'bg-amber-400' : color === 'teal' ? 'bg-teal-400' : 'bg-slate-600';

            return (
              <button
                key={day.id}
                onClick={() => day.type !== 'rest' && setActiveDay(day.id)}
                className={`
                  relative flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl border transition-all duration-200
                  ${isActive ? `${borderColor} ${bgActive} amber-glow` : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'}
                  ${day.type === 'rest' ? 'opacity-50 cursor-default' : 'cursor-pointer'}
                  fade-up fade-up-${i + 1}
                `}
              >
                <span className={`text-xs font-semibold ${isActive ? textColor : 'text-slate-400'}`} style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {day.dayTh.slice(3)}
                </span>
                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className={`text-xs text-center leading-tight hidden sm:block ${isActive ? textColor : 'text-slate-500'}`}>
                  {day.type === 'rest' ? 'พัก' : day.focusTh.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- Exercise Card ----
function ExerciseCard({ exercise, index }: { exercise: any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const difficultyColorMap: Record<string, string> = {
    beginner: 'text-teal-400 bg-teal-400/10 border-teal-400/30',
    intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    advanced: 'text-red-400 bg-red-400/10 border-red-400/30',
  };
  const difficultyColor = difficultyColorMap[exercise.difficulty as string] ?? difficultyColorMap.beginner;
  const difficultyLabel = ({ beginner: 'เริ่มต้น', intermediate: 'กลาง', advanced: 'สูง' } as Record<string, string>)[exercise.difficulty as string];

  return (
    <div
      className={`card-hover bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden fade-up fade-up-${Math.min(index + 1, 7)}`}
    >
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Number */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
          <span className="text-amber-400 text-sm font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>{index + 1}</span>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-white font-semibold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{exercise.nameTh}</h4>
              <p className="text-slate-400 text-xs mt-0.5">{exercise.name}</p>
            </div>
            <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColor}`}>
              {difficultyLabel}
            </span>
          </div>
          {/* Sets/Reps/Rest */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-slate-500 text-xs">เซต</span>
              <span className="text-amber-400 font-bold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{exercise.sets}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-500 text-xs">ครั้ง</span>
              <span className="text-amber-400 font-bold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{exercise.reps}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-slate-400 text-xs">{exercise.rest}</span>
            </div>
          </div>
        </div>
        {/* Expand icon */}
        <div className="flex-shrink-0 text-slate-500">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-700/50 pt-3 space-y-2">
          <div className="flex gap-2">
            <span className="text-slate-500 text-xs min-w-[60px]">กล้ามเนื้อ</span>
            <span className="text-slate-300 text-xs">{exercise.muscleGroup}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-500 text-xs min-w-[60px]">อุปกรณ์</span>
            <span className="text-slate-300 text-xs">{exercise.equipment}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-500 text-xs min-w-[60px]">เทคนิค</span>
            <span className="text-teal-400 text-xs">{exercise.tips}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Workout Day Detail ----
function WorkoutDayDetail({ day }: { day: WorkoutDay }) {
  const isCardio = day.type === 'cardio';
  const headerColor = isCardio ? 'text-teal-400' : 'text-amber-400';
  const badgeBg = isCardio ? 'bg-teal-400/10 text-teal-400 border-teal-400/30' : 'bg-amber-400/10 text-amber-400 border-amber-400/30';

  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container">
        {/* Day header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                {isCardio ? 'CARDIO' : 'WEIGHT TRAINING'}
              </span>
            </div>
            <h2 className={`text-2xl font-bold ${headerColor}`} style={{ fontFamily: 'Oswald, sans-serif' }}>
              {day.dayTh}
            </h2>
            <p className="text-slate-300 text-sm mt-1">{day.focusTh}</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
            <Clock className={`w-4 h-4 ${headerColor}`} />
            <span className="text-white font-semibold" style={{ fontFamily: 'Oswald, sans-serif' }}>{day.duration}</span>
          </div>
        </div>

        {/* Warm-up note */}
        {day.notesTh && (
          <div className="mb-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 flex gap-2">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm">{day.notesTh}</p>
          </div>
        )}

        {/* Exercise list */}
        <div className="space-y-3">
          {day.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Cardio Day Special ----
function CardioDaySection() {
  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663726804223/guhunZ8GeeDDmA2n8qfiBN/cardio-day-5mnLuRdnYoN9isaoUBkTzY.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/50" />
          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Cardio Day</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>วันพฤหัสบดี — Cardio & Active Recovery</h3>
            <p className="text-slate-300 text-sm max-w-md">HIIT บนลู่วิ่ง + Steady State เพื่อเผาผลาญไขมัน และช่วยฟื้นฟูกล้ามเนื้อ</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Nutrition Tips ----
function NutritionSection() {
  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container">
        <div className="flex items-center gap-2 mb-6">
          <Apple className="w-5 h-5 text-teal-400" />
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            <span className="text-teal-400">โภชนาการ</span> แนะนำ
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {nutritionTips.map((tip, i) => (
            <div
              key={tip.title}
              className={`card-hover bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 fade-up fade-up-${i + 1}`}
            >
              <div className="text-2xl mb-2">{tip.icon}</div>
              <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{tip.title}</div>
              <div className="text-amber-400 text-sm font-semibold mb-1">{tip.desc}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{tip.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
          <p className="text-slate-300 text-sm">
            <strong className="text-amber-400">เป้าหมาย Calorie:</strong> ประมาณ <strong className="text-white">2,200-2,400 kcal/วัน</strong> (Slight Surplus สำหรับ Recomposition)
            — ปรับตามน้ำหนักทุก 2 สัปดาห์ ถ้าน้ำหนักขึ้นเกิน 0.5 กก./สัปดาห์ ให้ลด 100-150 kcal
          </p>
        </div>
      </div>
    </section>
  );
}

// ---- Progression Plan ----
function ProgressionSection() {
  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            <span className="text-amber-400">แผน</span> Progression 12 สัปดาห์
          </h2>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700 hidden sm:block" />
          <div className="space-y-4">
            {progressionPlan.map((phase, i) => (
              <div key={phase.week} className={`sm:pl-12 relative fade-up fade-up-${i + 1}`}>
                {/* Timeline dot */}
                <div className={`absolute left-0 top-4 w-8 h-8 rounded-full border-2 hidden sm:flex items-center justify-center text-xs font-bold
                  ${phase.color === 'amber' ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-teal-400 bg-teal-400/10 text-teal-400'}
                `} style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {i + 1}
                </div>
                <div className={`bg-slate-800/40 border rounded-xl p-4
                  ${phase.color === 'amber' ? 'border-amber-400/20' : 'border-teal-400/20'}
                `}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                      ${phase.color === 'amber' ? 'bg-amber-400/10 text-amber-400' : 'bg-teal-400/10 text-teal-400'}
                    `}>{phase.week}</span>
                    <span className="text-white font-bold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{phase.focus}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="py-8">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center">
              <Dumbbell className="w-3 h-3 text-slate-950" />
            </div>
            <span className="text-slate-400 text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>FITPLAN PRO</span>
          </div>
          <p className="text-slate-500 text-xs text-center">
            แผนออกกำลังกายเฉพาะบุคคล — ออกแบบสำหรับ Body Recomposition
          </p>
          <p className="text-slate-600 text-xs">ปรึกษาแพทย์ก่อนเริ่มโปรแกรม</p>
        </div>
      </div>
    </footer>
  );
}

// ---- Main Home Page ----
export default function Home() {
  const [activeDay, setActiveDay] = useState('day1');

  const currentDay = workoutSchedule.find(d => d.id === activeDay);
  const isCardioDay = currentDay?.type === 'cardio';

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      <EquipmentSection />
      <WeeklySchedule activeDay={activeDay} setActiveDay={setActiveDay} />

      {/* Workout Detail */}
      {currentDay && currentDay.type !== 'rest' && (
        isCardioDay ? (
          <>
            <CardioDaySection />
            <WorkoutDayDetail day={currentDay} />
          </>
        ) : (
          <WorkoutDayDetail day={currentDay} />
        )
      )}

      {/* Rest day message */}
      {currentDay?.type === 'rest' && (
        <section className="py-16">
          <div className="container text-center">
            <div className="text-5xl mb-4">😴</div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>วันพักผ่อน</h3>
            <p className="text-slate-400">ร่างกายเติบโตระหว่างพัก ไม่ใช่ระหว่างออกกำลังกาย</p>
          </div>
        </section>
      )}

      <NutritionSection />
      <ProgressionSection />
      <Footer />
    </div>
  );
}
