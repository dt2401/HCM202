import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Star, Users, Globe, Heart, BookOpen, Award, ArrowRight, ChevronDown, Sun, Moon } from 'lucide-react'

function App() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  // new UI states
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  // video handling
  const videoRef = useRef(null)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  // timeline background video
  const timelineVideoRef = useRef(null)
  const [timelineVideoCanPlay, setTimelineVideoCanPlay] = useState(false)
  const [timelineVideoFailed, setTimelineVideoFailed] = useState(false)
  // active sub-topic inside international section
  const [activeIntlTopic, setActiveIntlTopic] = useState('intl-role')
  // Intro overlay state
  const [showIntro, setShowIntro] = useState(false)
  const introHeadingRef = useRef(null)
  const lastFocusedRef = useRef(null)
  // debug overlay for intl section
  const [intlDebug, setIntlDebug] = useState(false)

  // Navigation items (label -> target id)
  const navItems = [
    { id: 'hero', label: 'Trang chá»§' },
    { id: 'timeline', label: 'HÃ nh trÃ¬nh' },
    { id: 'dai-doan-ket', label: 'Äáº¡i Ä‘oÃ n káº¿t dÃ¢n tá»™c' },
    { id: 'doan-ket-quoc-te', label: 'ÄoÃ n káº¿t quá»‘c táº¿' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'ai-transparency', label: 'TÃ­nh minh báº¡ch AI' }
  ]

  // Function to scroll to next section
  const scrollToNextSection = (currentSectionId) => {
    const currentIndex = navItems.findIndex(item => item.id === currentSectionId)
    if (currentIndex !== -1 && currentIndex < navItems.length - 1) {
      const nextSection = navItems[currentIndex + 1]
      const element = document.getElementById(nextSection.id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quizQuestions = [
    {
      question: 'Theo Há»“ ChÃ­ Minh, Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c cÃ³ vai trÃ² nhÆ° tháº¿ nÃ o Ä‘á»‘i vá»›i cÃ¡ch máº¡ng Viá»‡t Nam?',
      options: [
        'LÃ  má»™t thá»§ Ä‘oáº¡n chÃ­nh trá»‹ nháº¥t thá»i.',
        'LÃ  váº¥n Ä‘á» cÃ³ Ã½ nghÄ©a chiáº¿n lÆ°á»£c, quyáº¿t Ä‘á»‹nh thÃ nh cÃ´ng cá»§a cÃ¡ch máº¡ng.',
        'Chá»‰ cáº§n thiáº¿t trong giai Ä‘oáº¡n cÃ¡ch máº¡ng dÃ¢n tá»™c dÃ¢n chá»§ nhÃ¢n dÃ¢n.',
        'KhÃ´ng cáº§n thiáº¿t khi cÃ³ sá»± lÃ£nh Ä‘áº¡o cá»§a Äáº£ng.'
      ],
      correct: 1,
      explanation: 'Theo Há»“ ChÃ­ Minh, Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c lÃ  má»™t váº¥n Ä‘á» cÃ³ Ã½ nghÄ©a chiáº¿n lÆ°á»£c, quyáº¿t Ä‘á»‹nh sá»± thÃ nh cÃ´ng cá»§a cÃ¡ch máº¡ng Viá»‡t Nam. NgÆ°á»i coi Ä‘Ã³ lÃ  chiáº¿n lÆ°á»£c lÃ¢u dÃ i, nháº¥t quÃ¡n vÃ  lÃ  nhÃ¢n tá»‘ sá»‘ng cÃ²n cá»§a dÃ¢n tá»™c.'
    },
    {
      question: 'Lá»±c lÆ°á»£ng cá»§a khá»‘i Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c theo tÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh bao gá»“m nhá»¯ng ai?',
      options: [
        'Chá»‰ cÃ´ng nhÃ¢n vÃ  nÃ´ng dÃ¢n.',
        'Chá»‰ nhá»¯ng ngÆ°á»i theo Äáº£ng Cá»™ng sáº£n.',
        'ToÃ n thá»ƒ nhÃ¢n dÃ¢n, táº¥t cáº£ nhá»¯ng ngÆ°á»i Viá»‡t Nam yÃªu nÆ°á»›c á»Ÿ cÃ¡c giai cáº¥p, táº§ng lá»›p, tÃ´n giÃ¡o, lá»©a tuá»•i.',
        'Chá»‰ nhá»¯ng ngÆ°á»i cÃ³ trÃ¬nh Ä‘á»™ tri thá»©c cao.'
      ],
      correct: 2,
      explanation: 'Há»“ ChÃ­ Minh kháº³ng Ä‘á»‹nh chá»§ thá»ƒ cá»§a khá»‘i Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c lÃ  "toÃ n thá»ƒ nhÃ¢n dÃ¢n, táº¥t cáº£ nhá»¯ng ngÆ°á»i Viá»‡t Nam yÃªu nÆ°á»›c á»Ÿ cÃ¡c giai cáº¥p, cÃ¡c táº§ng lá»›p trong xÃ£ há»™i, cÃ¡c ngÃ nh, cÃ¡c giá»›i, cÃ¡c lá»©a tuá»•i, cÃ¡c dÃ¢n tá»™c, Ä‘á»“ng bÃ o cÃ¡c tÃ´n giÃ¡o, cÃ¡c Ä‘áº£ng phÃ¡i, v.v."'
    },
    {
      question: 'Há»“ ChÃ­ Minh Ä‘Ã£ Ä‘Ãºc káº¿t vá» sá»©c máº¡nh cá»§a Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c qua cÃ¢u nÃ³i ná»•i tiáº¿ng nÃ o?',
      options: [
        '"KhÃ´ng cÃ³ gÃ¬ quÃ½ hÆ¡n Ä‘á»™c láº­p, tá»± do."',
        '"ÄoÃ n káº¿t, Ä‘oÃ n káº¿t, Ä‘áº¡i Ä‘oÃ n káº¿t; ThÃ nh cÃ´ng, thÃ nh cÃ´ng, Ä‘áº¡i thÃ nh cÃ´ng."',
        '"VÃ¬ lá»£i Ã­ch mÆ°á»i nÄƒm trá»“ng cÃ¢y, vÃ¬ lá»£i Ã­ch trÄƒm nÄƒm trá»“ng ngÆ°á»i."',
        '"NÆ°á»›c Viá»‡t Nam lÃ  má»™t, dÃ¢n tá»™c Viá»‡t Nam lÃ  má»™t."'
      ],
      correct: 1,
      explanation: 'CÃ¢u nÃ³i ná»•i tiáº¿ng cá»§a Há»“ ChÃ­ Minh vá» sá»©c máº¡nh cá»§a Ä‘áº¡i Ä‘oÃ n káº¿t lÃ : "ÄoÃ n káº¿t, Ä‘oÃ n káº¿t, Ä‘áº¡i Ä‘oÃ n káº¿t; ThÃ nh cÃ´ng, thÃ nh cÃ´ng, Ä‘áº¡i thÃ nh cÃ´ng."'
    },
    {
      question: 'Má»™t trong nhá»¯ng nguyÃªn táº¯c cÆ¡ báº£n cá»§a Ä‘áº¡i Ä‘oÃ n káº¿t dÃ¢n tá»™c theo Há»“ ChÃ­ Minh lÃ  gÃ¬?',
      options: [
        'Chá»‰ Ä‘oÃ n káº¿t nhá»¯ng ngÆ°á»i cÃ³ cÃ¹ng quan Ä‘iá»ƒm chÃ­nh trá»‹.',
        'Äáº¡i Ä‘oÃ n káº¿t pháº£i Ä‘Æ°á»£c xÃ¢y dá»±ng trÃªn cÆ¡ sá»Ÿ báº£o Ä‘áº£m nhá»¯ng lá»£i Ã­ch tá»‘i cao cá»§a dÃ¢n tá»™c, lá»£i Ã­ch cá»§a nhÃ¢n dÃ¢n lao Ä‘á»™ng.',
        'ÄoÃ n káº¿t mÃ  khÃ´ng cáº§n Ä‘áº¥u tranh, phÃª bÃ¬nh.',
        'Coi trá»ng cÃ¡i riÃªng, cÃ¡i khÃ¡c biá»‡t hÆ¡n cÃ¡i chung.'
      ],
      correct: 1,
      explanation: 'Má»™t trong nhá»¯ng nguyÃªn táº¯c quan trá»ng lÃ  "Äáº¡i Ä‘oÃ n káº¿t pháº£i Ä‘Æ°á»£c xÃ¢y dá»±ng trÃªn cÆ¡ sá»Ÿ báº£o Ä‘áº£m nhá»¯ng lá»£i Ã­ch tá»‘i cao cá»§a dÃ¢n tá»™c, lá»£i Ã­ch cá»§a nhÃ¢n dÃ¢n lao Ä‘á»™ng vÃ  quyá»n thiÃªng liÃªng cá»§a con ngÆ°á»i". NgÆ°á»i luÃ´n tÃ¬m kiáº¿m vÃ  phÃ¡t huy nhá»¯ng yáº¿u tá»‘ tÆ°Æ¡ng Ä‘á»“ng, thu háº¹p nhá»¯ng khÃ¡c biá»‡t.'
    },
    {
      question: 'TÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh vá» Ä‘oÃ n káº¿t quá»‘c táº¿ Ä‘Æ°á»£c hÃ¬nh thÃ nh trÃªn cÆ¡ sá»Ÿ nÃ o?',
      options: [
        'Chá»‰ dá»±a trÃªn truyá»n thá»‘ng yÃªu nÆ°á»›c cá»§a dÃ¢n tá»™c.',
        'Chá»‰ dá»±a trÃªn viá»‡c tiáº¿p thu chá»§ nghÄ©a MÃ¡c - LÃªnin.',
        'TrÃªn ná»n táº£ng truyá»n thá»‘ng yÃªu nÆ°á»›c, tinh tháº§n Ä‘oÃ n káº¿t cá»§a dÃ¢n tá»™c; trÃªn cÆ¡ sá»Ÿ tháº¥m nhuáº§n chá»§ nghÄ©a MÃ¡c - LÃªnin; tá»« thá»±c tiá»…n hoáº¡t Ä‘á»™ng cÃ¡ch máº¡ng cá»§a NgÆ°á»i.',
        'Chá»‰ dá»±a vÃ o viá»‡c Ä‘oÃ n káº¿t vá»›i cÃ¡c nÆ°á»›c xÃ£ há»™i chá»§ nghÄ©a.'
      ],
      correct: 2,
      explanation: 'TÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh vá» Ä‘oÃ n káº¿t quá»‘c táº¿ Ä‘Æ°á»£c hÃ¬nh thÃ nh vÃ  phÃ¡t triá»ƒn trÃªn ná»n táº£ng truyá»n thá»‘ng yÃªu nÆ°á»›c, tinh tháº§n Ä‘oÃ n káº¿t cá»§a dÃ¢n tá»™c; trÃªn cÆ¡ sá»Ÿ tháº¥m nhuáº§n chá»§ nghÄ©a MÃ¡c - LÃªnin vÃ  Ä‘Æ°á»ng lá»‘i cá»§a Quá»‘c táº¿ Cá»™ng sáº£n; tá»« thá»±c tiá»…n hoáº¡t Ä‘á»™ng cÃ¡ch máº¡ng sÃ´i ná»•i cá»§a NgÆ°á»i.'
    }
  ]

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleQuizAnswer = (idx) => {
    setSelectedAnswer(idx)
    setShowAnswer(true)
  }

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
      setSelectedAnswer(null)
      setShowAnswer(false)
    }
  }

  // Init mode preferences & reduced motion
  useEffect(() => {
    const stored = localStorage.getItem('theme-dark')
    if (stored === 'true') setDarkMode(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyRM = () => setReducedMotion(mq.matches)
    applyRM()
    mq.addEventListener('change', applyRM)
    return () => mq.removeEventListener('change', applyRM)
  }, [])


  const toggleDarkMode = () => {
    setDarkMode(d => {
      const v = !d
      localStorage.setItem('theme-dark', String(v))
      return v
    })
  }


  // Reveal on scroll
  useEffect(() => {
    document.documentElement.classList.add('js')
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Tilt effect for hero card
  useEffect(() => {
    if (reducedMotion) return
    const card = document.querySelector('.tilt-card')
    if (!card) return
    const handle = (e) => {
      const r = card.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const rx = ((y / r.height) - 0.5) * -12
      const ry = ((x / r.width) - 0.5) * 14
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const reset = () => (card.style.transform = 'rotateX(0deg) rotateY(0deg)')
    card.addEventListener('mousemove', handle)
    card.addEventListener('mouseleave', reset)
    return () => {
      card.removeEventListener('mousemove', handle)
      card.removeEventListener('mouseleave', reset)
    }
  }, [reducedMotion])

  // Observe international solidarity sub-blocks to highlight in local TOC
  useEffect(() => {
    const targets = document.querySelectorAll('#doan-ket-quoc-te [data-intl-topic]')
    if (!targets.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActiveIntlTopic(e.target.getAttribute('data-intl-topic'))
        }
      })
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  // Unified scroll handler (progress + parallax + active section)
  useEffect(() => {
    let ticking = false
    const sectionIds = navItems.map(n => n.id)
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const prog = docHeight > 0 ? y / docHeight : 0
          setScrollProgress(prog)
          setShowBackTop(y > 600)
          // Active section detection
          let current = 'hero'
          for (const id of sectionIds) {
            const sec = document.getElementById(id)
            if (!sec) continue
            const top = sec.getBoundingClientRect().top + window.scrollY - 140 // offset for fixed nav
            if (y >= top) current = id
          }
          setActiveSection(current)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion, navItems])

  // Lazy load and autoplay timeline background video when timeline section visible
  useEffect(() => {
    if (reducedMotion) return
    const section = document.getElementById('timeline')
    if (!section) return
    const v = timelineVideoRef.current
    if (!v) return
    let loaded = false
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !loaded) {
          loaded = true
          // trigger load
          v.load()
          const playAttempt = v.play()
          if (playAttempt && typeof playAttempt.then === 'function') {
            playAttempt.catch(() => {/* ignore */ })
          }
          io.unobserve(section)
        }
      })
    }, { threshold: 0.25 })
    io.observe(section)
    return () => io.disconnect()
  }, [reducedMotion])

  // Lazy play hero video when in view (moved inside component)
  useEffect(() => {
    if (reducedMotion) return
    const vid = videoRef.current
    if (!vid) return
    let played = false
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !played) {
          played = true
          const p = vid.play()
          if (p && typeof p.then === 'function') {
            p.catch(() => {
              setVideoFailed(true)
            })
          }
          io.disconnect()
        }
      })
    }, { threshold: 0.25 })
    io.observe(vid)
    return () => io.disconnect()
  }, [reducedMotion])

  // Ensure video plays (no toggle now)
  useEffect(() => {
    if (reducedMotion || videoFailed) return
    const vid = videoRef.current
    if (!vid) return
    const p = vid.play()
    if (p && typeof p.then === 'function') p.catch(() => { })
  }, [reducedMotion, videoFailed])

  // Close intro overlay helper
  const closeIntro = () => {
    setShowIntro(false)
    const prev = lastFocusedRef.current
    if (prev && typeof prev.focus === 'function') prev.focus()
  }

  // Keyboard handling for dialog
  useEffect(() => {
    if (!showIntro) return
    const keyHandler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault(); closeIntro(false)
      }
    }
    window.addEventListener('keydown', keyHandler)
    // focus heading
    setTimeout(() => introHeadingRef.current?.focus(), 30)
    return () => window.removeEventListener('keydown', keyHandler)
  }, [showIntro])

  // Key listener to toggle international layout debug (Shift + D)
  useEffect(() => {
    const kb = (e) => {
      if (e.key.toLowerCase() === 'd' && e.shiftKey) {
        setIntlDebug(d => !d)
      }
    }
    window.addEventListener('keydown', kb)
    return () => window.removeEventListener('keydown', kb)
  }, [])

  return (
    <div className={`${darkMode ? 'theme-dark' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

      <div className={`min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative transition-colors duration-500 ${darkMode ? 'dark-surface' : ''}`}>
        <div className="particle-layer">
          <span className="p" />
          <span className="p" />
          <span className="p" />
          <span className="p" />
          <span className="p" />
        </div>

        {/* Nav */}
        <nav className={`site-nav fixed top-0 w-full z-50 ${darkMode ? 'nav-dark' : ''}`}>
          <div className="nav-inner container mx-auto px-4">
            <button onClick={() => window.location.reload()} className="nav-left font-extrabold tracking-wide text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 rounded-sm" aria-label="Táº£i láº¡i trang">HCM202_IA1701</button>
            <ul className="nav-menu hidden md:flex">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="nav-right flex items-center gap-3">
              <button aria-label="Chuyá»ƒn cháº¿ Ä‘á»™ sÃ¡ng/tá»‘i" className="mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="group-badge">NHÃ“M 8</div>
            </div>
          </div>
        </nav>

        {/* Hero with background video only */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          {!reducedMotion && (
            <div className="hero-bg-video-wrapper" aria-hidden="true">
              <video
                ref={videoRef}
                className={`hero-bg-video ${videoCanPlay ? 'is-visible' : 'is-loading'}`}
                loop
                muted
                playsInline
                preload="none"
                poster="/flag-poster.jpg"
                onCanPlay={() => setVideoCanPlay(true)}
                onError={() => setVideoFailed(true)}
              >
                <source src="/vn_flag.mp4" type="video/mp4" />
              </video>
              <div className="hero-bg-overlay" />
            </div>
          )}
          <div className="container mx-auto px-6 xl:px-20 py-28 lg:py-32 relative z-10 w-full max-w-[1600px]">
            <div className="hero-layout-final">
              <div className="hero-text-block hero-text-block-final" data-reveal>
                <h1 className="hero-heading-compact" aria-label="TÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh vá» Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c vÃ  Ä‘oÃ n káº¿t quá»‘c táº¿">
                  TÆ¯ TÆ¯á»žNG Há»’ CHÃ MINH Vá»€ Äáº I ÄOÃ€N Káº¾T TOÃ€N DÃ‚N Tá»˜C VÃ€ ÄOÃ€N Káº¾T QUá»C Táº¾
                </h1>
                <p className="hero-desc-compact" data-reveal>
                  KhÃ¡m phÃ¡ tÆ° tÆ°á»Ÿng sÃ¢u sáº¯c cá»§a Chá»§ tá»‹ch Há»“ ChÃ­ Minh vá» Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c vÃ  Ä‘oÃ n káº¿t quá»‘c táº¿ â€“ ná»n táº£ng vá»¯ng cháº¯c cho sá»± nghiá»‡p cÃ¡ch máº¡ng Viá»‡t Nam.
                </p>
                <div className="hero-actions" data-reveal>
                  <Button size="lg" className="cta-primary" onClick={() => { lastFocusedRef.current = document.activeElement; setShowIntro(true) }}>
                    <BookOpen className="h-5 w-5" /> KHÃM PHÃ Ná»˜I DUNG
                  </Button>
                  <Button size="lg" variant="outline" className="cta-secondary" onClick={() => scrollToSection('timeline')}>
                    <ArrowRight className="h-5 w-5 icon-shift" /> XEM HÃ€NH TRÃŒNH
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start" data-reveal>
                <div className="chapter5-single-frame" aria-label="ChÆ°Æ¡ng 5: TÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh vá» Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c vÃ  Ä‘oÃ n káº¿t quá»‘c táº¿">
                  <img
                    src="/1.png"
                    alt="ChÆ°Æ¡ng 5: TÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh vá» Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c vÃ  Ä‘oÃ n káº¿t quá»‘c táº¿"
                    className="chapter5-image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
            <button
              onClick={() => scrollToNextSection('hero')}
              className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
              aria-label="Chuyá»ƒn Ä‘áº¿n section tiáº¿p theo"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </section>
        {showIntro && (
          <div className="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-heading" aria-describedby="intro-body">
            <div className="intro-dialog">
              <h3 id="intro-heading" ref={introHeadingRef} tabIndex={-1} className="intro-title">Tá»”NG QUAN</h3>
              <div id="intro-body" className="intro-content">
                <p>TÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh vá» Ä‘áº¡i Ä‘oÃ n káº¿t dÃ¢n tá»™c vÃ  Ä‘oÃ n káº¿t quá»‘c táº¿ lÃ  kim chá»‰ nam cho sá»± nghiá»‡p cÃ¡ch máº¡ng Viá»‡t Nam. Tá»« truyá»n thá»‘ng nhÃ¢n Ã¡i, cá»‘ káº¿t cá»™ng Ä‘á»“ng cá»§a dÃ¢n tá»™c, NgÆ°á»i phÃ¡t triá»ƒn thÃ nh quan Ä‘iá»ƒm chiáº¿n lÆ°á»£c: láº¥y nhÃ¢n dÃ¢n lÃ m gá»‘c, má»Ÿ rá»™ng máº·t tráº­n Ä‘oÃ n káº¿t, káº¿t há»£p sá»©c máº¡nh dÃ¢n tá»™c vá»›i sá»©c máº¡nh thá»i Ä‘áº¡i. ChuyÃªn trang giÃºp ngÆ°á»i há»c tiáº¿p cáº­n há»‡ thá»‘ng, cÃ³ chá»©ng cá»© lá»‹ch sá»­ - tá»« CÃ¡ch máº¡ng ThÃ¡ng TÃ¡m, khÃ¡ng chiáº¿n chá»‘ng xÃ¢m lÆ°á»£c Ä‘áº¿n cÃ´ng cuá»™c Ä‘á»•i má»›i - qua Ä‘Ã³ hiá»ƒu vÃ¬ sao Ä‘oÃ n káº¿t lÃ  nguá»“n sá»©c máº¡nh quyáº¿t Ä‘á»‹nh tháº¯ng lá»£i cá»§a cÃ¡ch máº¡ng Viá»‡t Nam vÃ  lÃ  cáº§u ná»‘i Viá»‡t Nam vá»›i báº¡n bÃ¨ nÄƒm chÃ¢u.</p>
              </div>
              <div className="intro-actions">
                <Button size="sm" variant="outline" className="cta-secondary" onClick={closeIntro}>ÄÃ³ng</Button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <section id="timeline" className="py-12 md:py-16 relative overflow-hidden timeline-section" data-reveal>
          {/* Background video */}
          {!reducedMotion && (
            <div className={`timeline-video-wrapper ${timelineVideoCanPlay ? 'is-visible' : 'is-loading'}`} aria-hidden="true">
              <video
                ref={timelineVideoRef}
                className="timeline-bg-video"
                loop
                muted
                playsInline
                preload="none"
                poster="/flag-poster.jpg"
                onCanPlay={() => setTimelineVideoCanPlay(true)}
                onError={() => setTimelineVideoFailed(true)}
              >
                <source src="/hanh_trinh.mp4" type="video/mp4" />
              </video>
              <div className="timeline-video-overlay" />
            </div>
          )}
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-yellow-300 mb-16">HÃ€NH TRÃŒNH TÆ¯ TÆ¯á»žNG Äáº I ÄOÃ€N Káº¾T</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400" />
              <div className="space-y-6 md:space-y-10">
                {[
                  { year: '1920', event: 'Tham gia Äáº¡i há»™i Äáº£ng XÃ£ há»™i PhÃ¡p táº¡i Tours', description: 'Nguyá»…n Ãi Quá»‘c bá» phiáº¿u tÃ¡n thÃ nh gia nháº­p Quá»‘c táº¿ Cá»™ng sáº£n' },
                  { year: '1930', event: 'ThÃ nh láº­p Äáº£ng Cá»™ng sáº£n Viá»‡t Nam', description: 'Äáº·t ná»n mÃ³ng cho sá»± lÃ£nh Ä‘áº¡o cá»§a Äáº£ng trong Ä‘áº¡i Ä‘oÃ n káº¿t dÃ¢n tá»™c' },
                  { year: '1941', event: 'ThÃ nh láº­p Máº·t tráº­n Viá»‡t Minh', description: 'HÃ¬nh thá»©c tá»• chá»©c cá»¥ thá»ƒ cá»§a khá»‘i Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c' },
                  { year: '1945', event: 'CÃ¡ch máº¡ng ThÃ¡ng TÃ¡m thÃ nh cÃ´ng', description: 'Tháº¯ng lá»£i cá»§a tÆ° tÆ°á»Ÿng Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c' },
                  { year: '1969', event: 'Di chÃºc Há»“ ChÃ­ Minh', description: 'Kháº³ng Ä‘á»‹nh táº§m quan trá»ng cá»§a Ä‘oÃ n káº¿t trong Äáº£ng vÃ  Ä‘oÃ n káº¿t quá»‘c táº¿' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-6 md:pr-8' : 'text-left pl-6 md:pl-8'}`}>
                      <Card className="bg-yellow-50 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow timeline-card compact">
                        <CardHeader className="py-3 px-4 pb-2">
                          <CardTitle className="text-red-800 text-lg md:text-xl leading-tight">{item.year}</CardTitle>
                          <CardDescription className="text-red-700 font-semibold text-sm md:text-base leading-snug">{item.event}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 pb-3 px-4">
                          <p className="text-red-600 text-sm md:text-[15px] leading-snug">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-red-800" />
                  </div>
                ))}
              </div>
            </div>

            {/* NÃºt mÅ©i tÃªn xuá»‘ng á»Ÿ giá»¯a bÃªn pháº£i */}
            <div className="absolute bottom-4 right-8 animate-bounce">
              <button
                onClick={() => scrollToNextSection('timeline')}
                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                aria-label="Chuyá»ƒn Ä‘áº¿n section tiáº¿p theo"
              >
                <ChevronDown className="w-8 h-8" />
              </button>
            </div>

          </div>
        </section>

        {/* 5.1 Section: Äáº¡i Ä‘oÃ n káº¿t dÃ¢n tá»™c á»Ÿ Viá»‡t Nam */}
        <section id="dai-doan-ket" className="min-h-screen bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden">
          {/* Video ná»n */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/5.1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Ä‘á»ƒ lÃ m sáº«m video */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 z-10">
            <div className="absolute inset-0 bg-repeat opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd770' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-20 container mx-auto px-8 py-20">
            {/* TiÃªu Ä‘á» chÃ­nh */}
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4 tracking-wide">
                Äáº I ÄOÃ€N Káº¾T DÃ‚N Tá»˜C á»ž VIá»†T NAM
              </h1>
              <div className="w-32 h-1 bg-yellow-400 mx-auto mt-6"></div>
            </div>

            {/* Content Layout - Hiá»‡u á»©ng nháº¹ nhÃ ng, bá»‘ trÃ­ gá»n */}
            <div className="relative max-w-6xl mx-auto min-h-[600px] px-6">

              {/* VAI TRÃ’ - Top, chá»¯ bÃªn trÃ¡i */}
              <div className="absolute top-30 left-0">
                <div className="flex items-center gap-10">
                  <div className="w-[360px]">
                    <h3 className="text-4xl font-bold text-yellow-400 mb-4" style={{ textAlign: 'right' }}>VAI TRÃ’</h3>
                    <p className="text-white text-base leading-8" style={{ textAlign: 'right', lineHeight: '1.5' }}>
                      Äáº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c lÃ  váº¥n Ä‘á» cÃ³ Ã½ nghÄ©a chiáº¿n lÆ°á»£c, lÃ  nhÃ¢n tá»‘ cÆ¡ báº£n quyáº¿t Ä‘á»‹nh tháº¯ng lá»£i cá»§a cÃ¡ch máº¡ng Viá»‡t Nam.
                    </p>
                  </div>
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float">
                    <img src="/5.1.1.png" alt="Vai trÃ²" className="w-full h-full object-cover scale-125" />
                  </div>
                </div>
              </div>

              {/* HÃŒNH THá»¨C Tá»” CHá»¨C - Middle right, chá»¯ bÃªn pháº£i */}
              <div className="absolute top-[138px] right-[-30px]">
                <div className="flex items-center gap-10 flex-row-reverse">
                  <div className="w-[320px]">
                    <h3 className="text-4xl font-bold text-yellow-400 mb-4" style={{ textAlign: 'left' }}>HÃŒNH THá»¨C Tá»” CHá»¨C</h3>
                    <p className="text-white text-base leading-7" style={{ textAlign: 'left', lineHeight: '1.5' }}>
                      <span className="text-yellow-300 font-semibold">Máº·t tráº­n dÃ¢n tá»™c thá»‘ng nháº¥t</span> lÃ  hÃ¬nh thá»©c tá»• chá»©c cá»¥ thá»ƒ cá»§a khá»‘i Ä‘áº¡i Ä‘oÃ n káº¿t toÃ n dÃ¢n tá»™c.
                    </p>
                  </div>
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-3 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float-delay">
                    <img src="/5.1.2.png" alt="HÃ¬nh thá»©c" className="w-full h-full object-cover scale-125" />
                  </div>
                </div>
              </div>

              {/* Lá»°C LÆ¯á»¢NG - Middle left, chá»¯ bÃªn trÃ¡i */}
              <div className="absolute top-[280px] left-[-150px]">
                <div className="flex items-center gap-14">
                  <div className="w-[420px]">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-4" style={{ textAlign: 'right' }}>Lá»°C LÆ¯á»¢NG Cá»¦A KHá»I Äáº I ÄOÃ€N Káº¾T</h3>
                    <div className="text-white text-base leading-7 space-y-2" style={{ textAlign: 'right', lineHeight: '1.5' }}>
                      <p><span className="text-yellow-300 font-semibold">Chá»§ thá»ƒ:</span> ToÃ n thá»ƒ nhÃ¢n dÃ¢n Viá»‡t Nam</p>
                      <p><span className="text-yellow-300 font-semibold">Lá»±c lÆ°á»£ng nÃ²ng cá»‘t:</span> Giai cáº¥p cÃ´ng nhÃ¢n, nÃ´ng dÃ¢n vÃ  trÃ­ thá»©c lÃ  nhá»¯ng lá»±c lÆ°á»£ng chá»§ yáº¿u.</p>
                    </div>
                  </div>
                  <div className="w-56 h-56 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float-slow">
                    <img src="/5.1.3.png" alt="Lá»±c lÆ°á»£ng" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* 4 ÄIá»€U KIá»†N - Bottom right, chá»¯ bÃªn pháº£i */}
              <div className="absolute bottom-0 right-[-205px]">
                <div className="flex items-center gap-9 flex-row-reverse">
                  <div className="w-[480px]">
                    <h3 className="text-4xl font-bold text-yellow-400 mb-6" style={{ textAlign: 'left' }}>4 ÄIá»€U KIá»†N XÃ‚Y Dá»°NG</h3>
                    <div className="text-white text-base leading-7 space-y-3" style={{ textAlign: 'left', lineHeight: '1.6' }}>
                      <p><span className="text-yellow-300 font-semibold">1.</span> Láº¥y lá»£i Ã­ch chung cá»§a dÃ¢n tá»™c lÃ m Ä‘iá»ƒm quy tá»¥</p>
                      <p><span className="text-yellow-300 font-semibold">2.</span> Káº¿ thá»«a vÃ  phÃ¡t huy truyá»n thá»‘ng yÃªu nÆ°á»›c</p>
                      <p><span className="text-yellow-300 font-semibold">3.</span> CÃ³ niá»m tin sÃ¢u sáº¯c vÃ o nhÃ¢n dÃ¢n</p>
                      <p><span className="text-yellow-300 font-semibold">4.</span> CÃ³ sá»± lÃ£nh Ä‘áº¡o cá»§a Äáº£ng Cá»™ng sáº£n Viá»‡t Nam</p>
                    </div>
                  </div>
                  <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float-gentle">
                    <img src="/5.1.4.png" alt="Äiá»u kiá»‡n" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

            </div>

            {/* NÃºt mÅ©i tÃªn xuá»‘ng Ä‘á»ƒ chuyá»ƒn section */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
              <button
                onClick={() => scrollToNextSection('dai-doan-ket')}
                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                aria-label="Chuyá»ƒn Ä‘áº¿n section tiáº¿p theo"
              >
                <ChevronDown className="w-8 h-8" />
              </button>
            </div>

          </div>
        </section>

        {/* 5.2 Section: ÄoÃ n káº¿t quá»‘c táº¿ (kiá»ƒu lá»“ng Ä‘Ã¨n) */}
        <section id="doan-ket-quoc-te" className="relative overflow-hidden bg-red-900 py-20 min-h-[1400px]">
          {/* Video ná»n */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/5.2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay Ä‘á»ƒ lÃ m sáº«m video */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* TiÃªu Ä‘á» */}
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-5xl font-bold text-yellow-400 uppercase mb-4 tracking-wide">
              ÄOÃ€N Káº¾T QUá»C Táº¾
            </h2>
            <p className="text-white text-lg opacity-90">
              Vá»‹ trÃ­ â€“ Ã nghÄ©a â€¢ CÆ¡ sá»Ÿ hÃ¬nh thÃ nh â€¢ Ná»™i dung â€¢ NguyÃªn táº¯c â€¢ PhÆ°Æ¡ng thá»©c
            </p>
            <div className="w-32 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>

          {/* Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 min-h-[1000px]">

            {/* BEN TRAI - 2 MUC (layout Ä‘á»™ng) */}

            {/* 1. Vá»‹ trÃ­ â€“ Ã nghÄ©a */}
            <div className="absolute top-[150px] left-[-50px] flex items-center gap-10">
              <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float">
                <img 
                  src="/5.2.1.png" 
                  alt="Vá»‹ trÃ­ Ã½ nghÄ©a" 
                  className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                />
              </div>
              <div className="w-[450px] text-left">
                <h3 className="text-4xl font-bold text-yellow-300 mb-5">Vá»‹ trÃ­ â€“ Ã nghÄ©a</h3>
                <p className="text-white leading-9 text-xl mb-4">
                  ÄoÃ n káº¿t quá»‘c táº¿ lÃ  bá»™ pháº­n há»¯u cÆ¡ cá»§a cÃ¡ch máº¡ng Viá»‡t Nam; lÃ  nhÃ¢n tá»‘ chiáº¿n lÆ°á»£c báº£o Ä‘áº£m tháº¯ng lá»£i bá»n vá»¯ng.
                </p>
                <p className="text-white leading-9 text-xl">
                  GiÃºp káº¿t há»£p sá»©c máº¡nh dÃ¢n tá»™c vá»›i sá»©c máº¡nh thá»i Ä‘áº¡i, táº¡o tháº¿, lá»±c vÃ  uy tÃ­n quá»‘c táº¿.
                </p>
              </div>
            </div>

            {/* 2. CÆ¡ sá»Ÿ hÃ¬nh thÃ nh */}
            <div className="absolute top-[580px] left-[30px] flex items-center gap-8">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float-delay">
                <img 
                  src="/5.2.2.png" 
                  alt="CÆ¡ sá»Ÿ hÃ¬nh thÃ nh" 
                  className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                />
              </div>
              <div className="w-[480px] text-left">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">CÆ¡ sá»Ÿ hÃ¬nh thÃ nh</h3>
                <ul className="list-none text-white space-y-3 text-lg">
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>Truyá»n thá»‘ng nhÃ¢n Ã¡i, yÃªu chuá»™ng hÃ²a bÃ¬nh</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>TÆ° tÆ°á»Ÿng Ä‘á»™c láº­p dÃ¢n tá»™c gáº¯n CNXH</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>Xu tháº¿ tiáº¿n bá»™ cá»§a thá»i Ä‘áº¡i</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>Phong trÃ o giáº£i phÃ³ng dÃ¢n tá»™c dÃ¢ng cao</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>LiÃªn há»‡ máº­t thiáº¿t giá»¯a cÃ¡ch máº¡ng VN vÃ  tháº¿ giá»›i</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* BEN PHAI - 3 MUC (layout tá»± nhiÃªn hÆ¡n) */}

            {/* 3. Ná»™i dung */}
            <div className="absolute top-[50px] right-[-40px] flex items-center gap-12">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float-slow">
                <img 
                  src="/5.2.3.png" 
                  alt="Ná»™i dung" 
                  className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                />
              </div>
              <div className="w-[400px] text-left">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">Ná»™i dung</h3>
                <ul className="list-none text-white space-y-2 text-lg">
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>ÄoÃ n káº¿t vá»›i phong trÃ o cá»™ng sáº£n & cÃ´ng nhÃ¢n</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Há»£p tÃ¡c vá»›i phong trÃ o giáº£i phÃ³ng dÃ¢n tá»™c</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Äáº¥u tranh vÃ¬ hÃ²a bÃ¬nh, cÃ´ng lÃ½, tiáº¿n bá»™</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Má»Ÿ rá»™ng há»¯u nghá»‹, há»£p tÃ¡c bÃ¬nh Ä‘áº³ng</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>TÃ´n trá»ng chá»§ quyá»n â€“ cÃ¹ng phÃ¡t triá»ƒn</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4. NguyÃªn táº¯c */}
            <div className="absolute top-[380px] right-[20px] flex items-center gap-9">
              <div className="w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float-gentle">
                <img 
                  src="/5.2.4.png" 
                  alt="NguyÃªn táº¯c" 
                  className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                />
              </div>
              <div className="w-[420px] text-left">
                <h3 className="text-4xl font-bold text-yellow-300 mb-5">NguyÃªn táº¯c</h3>
                <ul className="list-none text-white space-y-3 text-xl">
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>Äá»™c láº­p â€“ Tá»± chá»§ â€“ Tá»± lá»±c â€“ Tá»± cÆ°á»ng</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>BÃ¬nh Ä‘áº³ng â€“ TÃ´n trá»ng láº«n nhau</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>CÃ¹ng cÃ³ lá»£i â€“ Há»£p tÃ¡c chÃ¢n thÃ nh</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>Thá»§y chung trÆ°á»›c sau nhÆ° má»™t</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-xl">â€¢</span>
                    <span>Chá»‘ng chia ráº½, cÆ¡ há»™i, háº¹p hÃ²i</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. PhÆ°Æ¡ng thá»©c thá»±c hiá»‡n */}
            <div className="absolute top-[720px] right-[-60px] flex items-center gap-7">
              <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float">
                <img 
                  src="/5.2.5.png" 
                  alt="PhÆ°Æ¡ng thá»©c thá»±c hiá»‡n" 
                  className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                />
              </div>
              <div className="w-[460px] text-left">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">PhÆ°Æ¡ng thá»©c thá»±c hiá»‡n</h3>
                <ul className="list-none text-white space-y-2 text-lg">
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Káº¿t há»£p sá»©c máº¡nh dÃ¢n tá»™c & thá»i Ä‘áº¡i</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Äa phÆ°Æ¡ng hÃ³a, Ä‘a dáº¡ng hÃ³a quan há»‡</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Chá»§ Ä‘á»™ng há»™i nháº­p, phÃ¡t huy ná»™i lá»±c</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>Äá»‘i thoáº¡i â€“ Há»£p tÃ¡c â€“ CÃ¹ng phÃ¡t triá»ƒn</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-4 text-yellow-400 text-lg">â€¢</span>
                    <span>KiÃªn Ä‘á»‹nh má»¥c tiÃªu Ä‘á»™c láº­p & CNXH</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* NÃºt mÅ©i tÃªn xuá»‘ng Ä‘á»ƒ chuyá»ƒn section */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToNextSection('quiz')}
              className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
              aria-label="Chuyá»ƒn Ä‘áº¿n section tiáº¿p theo"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>

        </section>

        {/* Quiz */}
        <section id="quiz" className="py-16 bg-gradient-to-r from-red-900 to-red-800 relative overflow-hidden min-h-screen flex items-center" data-reveal>
          {/* Video ná»n */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/quiz.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay Ä‘á»ƒ lÃ m sáº«m video */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Title gá»n hÆ¡n */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 tracking-wider relative">
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  KIá»‚M TRA KIáº¾N THá»¨C
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full"></div>
              </h2>
              <p className="text-lg text-white opacity-90 font-medium">
                TÆ¯ TÆ¯á»žNG Há»’ CHÃ MINH Vá»€ Äáº I ÄOÃ€N Káº¾T VÃ€ ÄOÃ€N Káº¾T QUá»C Táº¾
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="bg-yellow-50 border-yellow-400 shadow-2xl backdrop-blur-sm bg-opacity-95">
                <CardHeader className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-yellow-300 py-4">
                  <CardTitle className="text-xl font-bold text-center">
                    CÃ¢u {currentQuiz + 1} / {quizQuestions.length}
                    <div className="w-full bg-red-900 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-1.5 rounded-full transition-all duration-500" 
                        style={{width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%`}}
                      ></div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-6 leading-relaxed">{quizQuestions[currentQuiz].question}</h3>
                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? (index === quizQuestions[currentQuiz].correct ? 'default' : 'destructive') : 'outline'}
                        className={`w-full text-left justify-start p-4 h-auto text-sm transition-all duration-300 ${selectedAnswer === index
                            ? index === quizQuestions[currentQuiz].correct
                              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                              : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                            : 'border-red-300 text-red-800 hover:bg-red-50 hover:border-red-400'
                          } ${showAnswer && index === quizQuestions[currentQuiz].correct ? 'bg-green-600 text-white shadow-lg' : ''}`}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showAnswer}
                      >
                        <span className="mr-3 font-bold bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </Button>
                    ))}
                  </div>
                  
                  {showAnswer && (
                    <div className="mb-6">
                      {selectedAnswer === quizQuestions[currentQuiz].correct ? (
                        // ÄÃºng - Hiá»ƒn thá»‹ giáº£i thÃ­ch
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-600 shadow-lg">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">âœ“</span>
                            </div>
                            <div>
                              <p className="text-green-800 font-semibold mb-1">ChÃ­nh xÃ¡c!</p>
                              <p className="text-green-700 text-sm leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Sai - Hiá»ƒn thá»‹ thÃ´ng bÃ¡o sai vÃ  Ä‘Ã¡p Ã¡n Ä‘Ãºng
                        <div className="space-y-3">
                          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border-l-4 border-red-600 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">âœ—</span>
                              </div>
                              <p className="text-red-800 font-semibold">ChÆ°a chÃ­nh xÃ¡c. ÄÃ¡p Ã¡n Ä‘Ãºng lÃ : {String.fromCharCode(65 + quizQuestions[currentQuiz].correct)}</p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-600 shadow-lg">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">i</span>
                              </div>
                              <p className="text-blue-800 text-sm leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {showAnswer && currentQuiz < quizQuestions.length - 1 && (
                    <div className="text-center">
                      <Button onClick={nextQuestion} className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-yellow-300 px-6 py-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        CÃ¢u tiáº¿p theo <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  {showAnswer && currentQuiz === quizQuestions.length - 1 && (
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 shadow-lg">
                        <h4 className="text-xl font-bold text-green-800 mb-1">ðŸŽ‰ HoÃ n thÃ nh!</h4>
                        <p className="text-green-700">Báº¡n Ä‘Ã£ hoÃ n thÃ nh bá»™ cÃ¢u há»i vá» tÆ° tÆ°á»Ÿng Há»“ ChÃ­ Minh</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* NÃºt mÅ©i tÃªn xuá»‘ng */}
            <div className="text-center mt-8">
              <button
                onClick={() => scrollToNextSection('ai-transparency')}
                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform bg-black bg-opacity-30 rounded-full p-3"
                aria-label="Chuyá»ƒn Ä‘áº¿n section tiáº¿p theo"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>

          </div>
        </section>

        {/* AI Transparency Section */}
        <section id="ai-transparency" className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-red-900 to-black">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-8">
                TÃ­nh minh báº¡ch khi dÃ¹ng AI táº¡o hÃ¬nh áº£nh (GPT & Gemini)
              </h1>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              
              {/* Section 1 */}
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl p-8 border border-yellow-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-yellow-600 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</span>
                  CÃ´ng cá»¥ AI Ä‘Ã£ sá»­ dá»¥ng
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>
                    <span className="text-yellow-300 font-semibold">â€¢ GPT (OpenAI):</span> táº¡o minh hoáº¡, biá»ƒu tÆ°á»£ng, texture vÃ  background theo prompt.
                  </div>
                  <div>
                    <span className="text-yellow-300 font-semibold">â€¢ Gemini (Google):</span> táº¡o sinh viáº¿t hoáº¡ sá»­ dá»±ng vÃ  biáº¿n thá»ƒ Ä‘á»ƒ sáº¯p dáº¡ng hoÃ t cá»§a nghiá»‡m.
                  </div>
                  <div>
                    <span className="text-yellow-300 font-semibold">â†’ Ãnh xáº£ Ä‘Æ°á»£c dÃ¹ng Ä‘á»ƒ minh hoáº¡ khÃ¡i niá»‡m, timeline, poster mÃ´ phá»ng phong cÃ¡ch cá»• Ä‘á»™ng giÃºp ná»™i dung háº¥p dáº«n vÃ  trá»±c quan hÆ¡n.</span>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-2xl p-8 border border-red-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</span>
                  Má»¥c Ä‘Ã­ch sá»­ dá»¥ng AI
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ NÃ¢ng cao tráº£i nghiá»‡m ngÆ°á»i dÃ¹ng báº±ng hÃ¬nh áº£nh trá»±c quan cho cÃ¡c pháº§n: DÃ¢n chá»§ XHCN, NNPQ XHCN, má»©c tÃ­ch há»£p vÃ  nhá» phÃ¡t triá»ƒn.</div>
                  <div>â€¢ Táº¡o ra nhá»¯ng hÃ¬nh áº£nh mÃ´ táº£ má»™t má»£t má»™t há»£p khÆ¡i gá»£i cáº£m xÃºc nhiá»u mÃ n thá»‘ng, má»™t nÃ©t, Ä‘á»™ hoáº¡ tÆ°Æ¡i tÆ°Æ¡ng.</div>
                  <div>â€¢ ThÃ nh táº¡m dÃ¹ng báº¡ch AI chá»‰ náº±ng tÃ¬nh biá»‡t hoa, khÃ´ng Ä‘á»™ng Ä‘á»ƒ thay tháº¿ dÃ i tá»‘i vÄƒn tá»± hay chá»«ng vá»›i lá»‹ch sá»­.</div>
                </div>
              </div>

              {/* Section 3 - Highlighted */}
              <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border-2 border-yellow-500/50 backdrop-blur-sm shadow-2xl">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</span>
                  Vai trÃ² há»— trá»£ - khÃ´ng thay tháº¿
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ AI chá»‰ há»— trá»£ táº¡o minh hoáº¡ dá»… hiá»ƒu, nÃ³i dÃ¹ng há»c thuáº­t, luáº­n Ä‘iá»ƒm, phÃ¢n tÃ­ch do sinh viÃªn soáº¡n.</div>
                  <div>â€¢ Chá»§ ná»™i dÃ¹ng Ä‘Æ°á»£c sÆ°u vÃ  nghiá»‡p tá»« sá»›n tÃªn tháº£ cÃ´ng vÃ  váº£ cháº¿ phÃ¡t ngÆ°á»i dÃ¹ng.</div>
                  <div>â€¢ KhÃ´ng dÃ¹ng AI Ä‘á»ƒ táº­p giáº£ máº¡o tÆ° tá» lá»‹ch chÃ­ sá»­ hay tÃ¢y tháº¿ Ä‘á»i nghÄ© chÃ­nh trÃ­ lá»‹u nguyá»n báº£n.</div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</span>
                  Quy trÃ¬nh kiá»ƒm tra vÃ  ghi nháº­n ná»™i dung
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ Chá»‰ nháº­n ná»™i dÃ¹ng hÃ¬nh AI Ä‘Æ°á»£c táº¡p tá»« "AI-generated" trong chÃº thÃ­ch text hoáº·c gÃ³c cáº£nh.</div>
                  <div>â€¢ CÃ³ quyáº¿t ká»¹ prompt Ä‘áº¡t má» há»£p vá»›i ná»™i dung, khÃ´ng sá»­ lá»‹ch chÆ° nháº¡i cáº©m, kiá»ƒm tra tÃ­nh há»£p vÄƒt ná»™i cáº£nh há»c thuáº­t.</div>
                  <div>â€¢ Nháº¯t ká»³ prompt: táº§u má»“ tÃ¡ nghiÃ£ gon trÆ°c tá»‰á»ƒu, style, tÃ£ng badgÃ© ráº§y vá»›i vÃ£ tÃ£ táº¡o khi cáº§n.</div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">5</span>
                  Pháº¡m vi vÃ  giá»›i háº¡n
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ KhÃ´ng dÃ¹ng sinh AI Ä‘á» mÃ´ tÃ£ nhá»¯ng tÃ i liá»‡u máº­t táº§n cá»• tháº­t hoáº·c logofothen hiá»‡u.</div>
                  <div>â€¢ TrÃ¡nh cÃ¡c áº¹Ã  viá»‡ng cáº£nh khÃ´ng dÃ¹ng AI Ä‘á»ƒ suy diá»ƒn giáº£ phÃ¡p, hay táº¡o "tÆ° liá»‡u" fá»n dá»©t.</div>
                  <div>â€¢ Vá»›i hiá»ƒu hÆ°á»Ÿng táº¯t vÄƒm hÃ³a - tá»“n nÃ´ cÃ¡c á»§ tÃ¢m nguyÃªn gÃ³c máº¯c phÃ¡p AI chá»‰ táº¡o hÃ¬nh trong khÃ¡i quáº±s.</div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-purple-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">6</span>
                  Äáº¡o Ä‘á»©c, báº£n quyá»n vÃ  quyá»n sá»­ dá»¥ng
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ TÃ´n trá»ng báº£n quyá»n cá»§a nghá»‡ sÄ© khÃ´ng cáº§n táº£o sinh khÃ´ng gÃ³i lá»µ háº£nh áº£l nguy hiá»ƒm.</div>
                  <div>â€¢ Háº¡n cháº¿ sá»­ dá»±ng phong cÃ¡ch cÃ¡ nhÃ¢n cá»§a nghá»‡ sÄ© Ä‘á»ƒ trÃ¡nh xÃºc pháº¡m quyá»n.</div>
                  <div>â€¢ LuÃ´n ghi kÃ­nh tÃ´n nghiá»‡m khi phÃ²i sinh lÃ nh tháº­t cÃ i vá»›i viá»‡c dÃ¹ng ká»¹ pháº¡m vi há»c thuáº­t.</div>
                </div>
              </div>

              {/* Section 7 */}
              <div className="bg-gradient-to-r from-teal-900/20 to-cyan-900/20 rounded-2xl p-8 border border-teal-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">7</span>
                  An toÃ n vÃ  giáº£m rá»§i ro sai lá»‡ch
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ Ãp dáº¡ng tá»«Ã¸Ã§ prompt trong tÃ¬nh, khÃ´ng Ä‘á»™ng Ä‘Ã­ch khÃ´ng gá»£i lá»· hÃ nh vÃ­ nguy hiá»ƒm.</div>
                  <div>â€¢ Soi chiáº¿u ná»™i dung sinh AI phÃ¡t kháº¥p mÃ£ tá»‘t, khÃ´ng quÃ¡ nguy báº£ng chÃ³ng.</div>
                  <div>â€¢ Quy Ä‘á»‹nh: AI cháº¿t "nghiÃªc thá»­ hai Ä‘Æ°á»£c tri trÆ°á»›c khi nÃªn web.</div>
                </div>
              </div>

              {/* Section 8 */}
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-8 border border-orange-600/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">8</span>
                  Cam káº¿t minh báº¡ch vÃ  liÃªm chÃ­nh há»c thuáº­t
                </h2>
                <div className="text-white/90 space-y-4">
                  <div>â€¢ CÃ´ng bá»‘ rÃµ ná»™i dá»±ng hÃ¬nh AI, phÃ¢n biá»‡t minh hoáº£ AI vá»›i lá»—i tÆ° liá»‡u gÃ³c.</div>
                  <div>â€¢ Ná»™i dung chÃ­nh cá»§a trang web (ná»™i dung, bá»“i cáº§n trÃ­ch, bÃ i luáº­n) do sinh viÃªn chuáº§n trÃ­ch nghiá»‡m soáº¡n.</div>
                  <div>â€¢ Sáºµn sÃ ng cung cáº¥p prompt táº¡m táº¥t theo yá»u cáº§u kiá»ƒm tra cá»§a phÃ²ng vi há»c thuáº­t.</div>
                </div>
              </div>

            </div>

            {/* Back Button */}
            <div className="text-center mt-16">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-yellow-300 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border border-yellow-600/30"
              >
                â† Vá»€ TRANG CHá»¦
              </button>
            </div>
          </div>
                { / *   F o o t e r   * / } 
                 < f o o t e r   c l a s s N a m e = " b g - r e d - 9 0 0   b o r d e r - t   b o r d e r - y e l l o w - 4 0 0 / 2 0   p y - 8 " > 
                     < d i v   c l a s s N a m e = " c o n t a i n e r   m x - a u t o   p x - 4   t e x t - c e n t e r " > 
                         < p   c l a s s N a m e = " t e x t - y e l l o w - 1 0 0   m b - 4 " > �   2 0 2 5   -   T �  t ��n g   H �  C h �   M i n h   v �  �i   o � n   k �t   t o � n   d � n   t �c   v �   o � n   k �t   q u �c   t �< / p > 
                         < p   c l a s s N a m e = " t e x t - y e l l o w - 3 0 0   t e x t - s m " > " o � n   k �t ,   o � n   k �t ,   �i   o � n   k �t .   T h � n h   c � n g ,   t h � n h   c � n g ,   �i   t h � n h   c � n g "   -   C h �  t �c h   H �  C h �   M i n h < / p > 
                     < / d i v > 
                 < / f o o t e r > 
 
                 { / *   N � t   l � n   �u   t r a n g   -   F i x e d   p o s i t i o n   * / } 
                 { s h o w B a c k T o p   & &   ( 
                     < b u t t o n 
                         o n C l i c k = { s c r o l l T o T o p } 
                         c l a s s N a m e = " f i x e d   b o t t o m - 8   r i g h t - 8   b g - y e l l o w - 4 0 0   h o v e r : b g - y e l l o w - 5 0 0   t e x t - r e d - 9 0 0   r o u n d e d - f u l l   p - 4   s h a d o w - l g   h o v e r : s h a d o w - x l   t r a n s i t i o n - a l l   d u r a t i o n - 3 0 0   h o v e r : s c a l e - 1 1 0   z - 5 0 " 
                         a r i a - l a b e l = " L � n   �u   t r a n g " 
                     > 
                         < A r r o w R i g h t   c l a s s N a m e = " w - 6   h - 6   t r a n s f o r m   - r o t a t e - 9 0 "   / > 
                     < / b u t t o n > 
                 ) } 
             < / d i v > 
         < / d i v > 
     ) 
 } 
 
 e x p o r t   d e f a u l t   A p p  
 