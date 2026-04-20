import { Link } from 'react-router-dom'
import { Users, Star, CalendarCheck, MessageCircle } from 'lucide-react'
import FadeIn from '@/components/common/FadeIn'

const REVIEWS = [
  {
    name: 'Sophie Marchand',
    flag: '🇨🇦',
    goal: 'TEF Canada',
    rating: 5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SophieMarchand&backgroundColor=d1d4f9',
    text: 'Dr. Beumo helped me go from B1 to a TEF score that qualified me for permanent residency in just 3 months. Her sessions are structured, focused, and she always knew exactly where I was struggling.',
  },
  {
    name: 'Kwame Asante',
    flag: '🇬🇭',
    goal: 'TCF Preparation',
    rating: 5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=KwameAsante&backgroundColor=c0aede',
    text: 'I had tried apps and group classes before, but nothing compared to one-on-one lessons with Dr. Beumo. She tailored every session to my weak points and my TCF score exceeded my target.',
  },
  {
    name: 'Amara Diallo',
    flag: '🇸🇳',
    goal: 'General French',
    rating: 5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AmaraDiallo&backgroundColor=ffd5dc',
    text: 'As someone learning French for work, I needed practical conversational skills quickly. Dr. Beumo made every lesson feel natural and her feedback was always clear and encouraging.',
  },
  {
    name: 'Lena Hoffmann',
    flag: '🇩🇪',
    goal: 'DELF B2',
    rating: 5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=LenaHoffmann&backgroundColor=b6e3f4',
    text: 'Dr. Beumo is an exceptional teacher. She has a gift for explaining grammar in a way that finally makes sense. I passed my DELF B2 on the first attempt thanks to her guidance.',
  },
  {
    name: 'Carlos Reyes',
    flag: '🇲🇽',
    goal: 'Conversation Practice',
    rating: 5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CarlosReyes&backgroundColor=d4edda',
    text: 'I was nervous about speaking French but Dr. Beumo created such a relaxed and supportive environment. After 6 weeks I was holding full conversations with confidence. Highly recommend!',
  },
]

// Replace this with Dr. Beumo's actual YouTube video ID
const INTRO_VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID'

const FEATURES = [
  {
    icon: Users,
    title: 'One-on-One Sessions',
    description: 'Private lessons tailored entirely to your pace, goals, and schedule.',
  },
  {
    icon: Star,
    title: 'Native French Speaker',
    description: 'Learn authentic pronunciation and natural expressions directly from a native speaker.',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Scheduling',
    description: 'Book sessions at times that work for you — mornings, afternoons, or evenings.',
  },
  {
    icon: MessageCircle,
    title: 'Exam-Focused Coaching',
    description: 'Targeted preparation for TEF, TCF, DELF, DALF and other French proficiency exams.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col items-center text-center gap-8">
          <FadeIn delay={0}>
            <span className="inline-flex items-center gap-2 bg-accent-50 text-accent text-sm font-semibold px-4 py-1.5 rounded-full border border-accent-100">
              🇫🇷 One-on-One French Tutoring
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
              Your path to{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #1B3F73 0% 33%, #C8C8C8 33% 66%, #C0533A 66% 100%)' }}
              >
                French
              </span>
              {' '}
              <span className="text-primary">Fluency</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg text-gray-500 max-w-xl">
              Personal lessons with Dr. Beumo Lesly — expert preparation for TEF, TCF, DELF/DALF,
              or simply learning French at your own pace.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <Link to="/register" className="btn-primary text-base px-8 py-3">
              Book a Session
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Meet Dr. Beumo — intro video */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Meet Dr. Beumo</h2>
              <p className="text-gray-500 mt-2 max-w-lg mx-auto">
                Hear directly from Dr. Beumo about her teaching approach and how she helps students
                reach their French language goals.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-900"
              style={{ paddingBottom: '56.25%' }}
            >
              {INTRO_VIDEO_ID === 'YOUR_YOUTUBE_VIDEO_ID' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-sm font-medium">Video coming soon</p>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${INTRO_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="Introduction by Dr. Beumo Lesly"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Why learn with Dr. Beumo?</h2>
              <p className="text-gray-500 mt-2 max-w-lg mx-auto">
                Personalised, focused, and effective — lessons built around you.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">What students say</h2>
              <p className="text-gray-500 mt-2 max-w-lg mx-auto">
                Real results from real learners who trained with Dr. Beumo Lesly.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(({ name, flag, goal, rating, text, avatar }, i) => (
              <FadeIn key={name} delay={i * 80}>
                <div className="flex flex-col gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-6 h-full">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }).map((_, s) => (
                      <Star key={s} size={15} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">"{text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {name} <span className="text-base">{flag}</span>
                      </p>
                      <p className="text-xs text-gray-400">{goal}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary py-16">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to start your French journey?
            </h2>
            <p className="text-primary-200 text-lg">
              Book a one-on-one session with Dr. Beumo and take the first step today.
            </p>
            <Link
              to="/register"
              className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-600 transition-colors duration-150"
            >
              Book a Session
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
