import { useEffect, useState } from 'react';
// import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, Boxes, Building2, Check, Instagram, Linkedin, Facebook, Mail, Menu, MessageCircle, PackageCheck, Phone, Store, Truck, Users, X } from 'lucide-react';

// framer motion animation 
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  
} from "framer-motion";
// import { ArrowLeft, ArrowDownLeft } from "lucide-react";

const EASE_SMOOTH = [0.22, 1, 0.36, 1];

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE_SMOOTH,
    },
  },
};

const accentLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: EASE_SMOOTH,
    },
  },
};
// framer motion animation 

// Replace these clearly marked demo values once MADAD's official channels are confirmed.
const DEMO_CONTACT = {
  phone: '+249112786618',
  whatsapp: '+249112786618',
  email: 'midad@contact.com',
  social: [
    { name: 'Instagram', url: 'https://example.invalid/madad/instagram' },
    { name: 'LinkedIn', url: 'https://example.invalid/madad/linkedin' },
  ],
};

const APP_STORE_SEARCH_URL = 'https://apps.apple.com/search?term=MADAD%20Sudan';
const GOOGLE_PLAY_SEARCH_URL = 'https://play.google.com/store/search?q=MADAD%20Sudan&c=apps';

const navItems = [
  ['عن مداد', '#about'],
  ['كيف نعمل', '#how'],
  ['للموردين', '#suppliers'],
  ['للتجار', '#merchants'],
  ['تواصل معنا', '#contact'],
];

function Brand({ light = false }) {
  return (
    <a href="#home" aria-label="مداد — الصفحة الرئيسية" className="inline-flex items-center gap-3">
      <img src={light ? '/assets/madad-logo-white.svg' : '/assets/madad-logo.svg'} alt="" className="h-10 w-12 object-contain" />
      <span className={`font-bold text-[21px] tracking-tight ${light ? 'text-[#f6f3eb]' : 'text-[#05563D]'}`}>مداد</span>
    </a>
  );
}

function StoreBadge({ platform, href, testId }) {
  const isApple = platform === 'App Store';

  return (
    <a
      data-testid={testId}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`ابحث عن مداد في ${platform}`}
      className="inline-flex min-h-[54px] min-w-[164px] items-center gap-2.5 rounded-[9px] border border-white/25 bg-black px-3.5 py-2 text-left text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7b66f]"
      dir="ltr"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden="true">
        {isApple ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.5-1.4 0-1.8-.8-3.3-.8s-2 .8-3.3.8c-1.3 0-2.3-1.3-3.1-2.5C3.2 15.9 2.5 10.6 5.1 7.9c1.3-1.4 3.4-2.2 5.2-2.3 1.3 0 2.6.9 3.4.9.8 0 2.3-1.1 3.9-1 .7 0 2.5.3 3.7 2-.1.1-2.2 1.3-2.2 3.9 0 3.1 2.7 4.1 2.7 4.1s-.4 1.5-1.4 2.9M13.2 4.8c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
            <path d="M4.6 3.6c-.3.3-.5.7-.5 1.2v14.4c0 .5.2.9.5 1.2L12.3 12 4.6 3.6Z" fill="#34A853" />
            <path d="m4.6 3.6 9.8 5.6 2.3-2.4L7.2 2.2c-.9-.5-1.8-.2-2.6 1.4Z" fill="#4285F4" />
            <path d="m14.4 14.8-9.8 5.6c.8 1.6 1.7 1.9 2.6 1.4l9.5-4.6-2.3-2.4Z" fill="#EA4335" />
            <path d="m16.7 6.8-4.4 5.2 4.4 5.2 4.5-2.2c1.1-.6 1.1-1.5 0-2.1l-4.5-2.2Z" fill="#FBBC04" />
          </svg>
        )}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[9px] font-medium tracking-wide text-white/85">
          {isApple ? 'Download on the' : 'GET IT ON'}
        </span>
        <span className="mt-1 font-sans text-[15px] font-semibold tracking-tight">
          {platform}
        </span>
      </span>
    </a>
  );
}

function StoryReveal({ as = 'div', children, className, delay = 0, trigger = 'view', ...props }) {
  const prefersReducedMotion = useReducedMotion();
  const supportsScrollMotion = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const MotionElement = motion[as] ?? motion.div;
  const motionProps = prefersReducedMotion || (trigger === 'view' && !supportsScrollMotion)
    ? { initial: false }
    : {
        initial: {
          opacity: 0,
          ...(prefersReducedMotion ? {} : { y: 42, scale: 0.985 }),
        },
        ...(trigger === 'mount'
          ? {
              animate: {
                opacity: 1,
                ...(prefersReducedMotion ? {} : { y: 0, scale: 1 }),
              },
            }
          : {
              whileInView: {
                opacity: 1,
                ...(prefersReducedMotion ? {} : { y: 0, scale: 1 }),
              },
              viewport: { once: true, amount: 0.12 },
            }),
        transition: {
          duration: prefersReducedMotion ? 0.32 : 0.82,
          delay: prefersReducedMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return <MotionElement data-story-reveal="" className={className} {...motionProps} {...props}>{children}</MotionElement>;
}

function SectionIntro({ eyebrow, title, children, light = false }) {
  return (
    <StoryReveal className="max-w-2xl">
      <p className={`mb-4 text-[12px] font-bold tracking-[.15em] ${light ? 'text-[#d7b66f]' : 'text-[#8d7144]'}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-bold leading-[1.45] tracking-[-.04em] sm:text-4xl md:text-[46px] ${light ? 'text-[#f6f3eb]' : 'text-[#18382d]'}`}>{title}</h2>
      {children && <p className={`mt-5 max-w-xl text-[15px] leading-8 ${light ? 'text-[#d2ded6]' : 'text-[#69786e]'}`}>{children}</p>}
    </StoryReveal>
  );
}

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const parallaxImages = document.querySelectorAll('[data-scroll-depth]');

    let frameId = 0;
    const updateParallax = () => {
      frameId = 0;
      const viewportHeight = window.innerHeight || 1;

      parallaxImages.forEach((image) => {
        const frame = image.parentElement;
        if (!frame) return;
        const bounds = frame.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > viewportHeight) return;

        const depth = Number(image.dataset.scrollDepth) || 14;
        const progress = (viewportHeight / 2 - (bounds.top + bounds.height / 2)) / viewportHeight;
        const offset = Math.max(-depth, Math.min(depth, progress * depth));
        image.style.setProperty('--scroll-offset', `${offset.toFixed(2)}px`);
      });
    };
    const queueParallaxUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', queueParallaxUpdate, { passive: true });
    window.addEventListener('resize', queueParallaxUpdate);
    queueParallaxUpdate();

    return () => {
      window.removeEventListener('scroll', queueParallaxUpdate);
      window.removeEventListener('resize', queueParallaxUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
      parallaxImages.forEach((image) => image.style.removeProperty('--scroll-offset'));
    };
  }, []);

    // motion
    const sectionRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
  
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end start"],
    });
  
    // حركة Parallax خفيفة للصورة أثناء النزول في الصفحة
    const imageY = useTransform(
      scrollYProgress,
      [0, 1],
      prefersReducedMotion ? ["0%", "0%"] : ["0%", "14%"]
    );
    const imageScale = useTransform(
      scrollYProgress,
      [0, 1],
      prefersReducedMotion ? [1.04, 1.04] : [1.05, 1.12]
    );
    // motion

  return (
    <div className="page-grain min-h-[100dvh] overflow-hidden" dir="rtl">
      <header className="relative z-40 border-b border-[#dcd8cc] bg-[#f6f3eb]/95">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <Brand />
          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-8 lg:flex">
            {navItems.map(([label, href]) => <a key={href} data-testid={`link-nav-desktop-${href.slice(1)}`} className="nav-link text-[13px] font-medium text-[#475c50] transition-colors hover:text-[#05563D]" href={href}>{label}</a>)}
          </nav>
          <a data-testid="link-contact-header" href="#contact" className="hidden items-center gap-2 rounded-full bg-[#05563D] px-5 py-3 text-[13px] font-semibold text-[#f8f6ef] transition hover:bg-[#0c6b4e] sm:inline-flex">
             تواصل معنا <ArrowLeft size={16} aria-hidden="true" />
          </a>
            <button data-testid="button-mobile-menu" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d5d1c5] text-[#05563D] lg:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && <nav aria-label="قائمة الهاتف" className="absolute inset-x-0 top-full border-b border-[#dcd8cc] bg-[#f6f3eb] px-5 pb-5 shadow-lg lg:hidden">
          {navItems.map(([label, href]) => <a key={href} data-testid={`link-nav-mobile-${href.slice(1)}`} onClick={closeMenu} href={href} className="block border-b border-[#e6e1d7] py-3.5 text-sm text-[#334f41]">{label}</a>)}
          <a data-testid="link-contact-mobile" onClick={closeMenu} href="#contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#05563D] px-5 py-3 text-sm font-semibold text-white">تواصل مع مداد <ArrowLeft size={16} /></a>
        </nav>}
      </header>

      <main>
      <section
      ref={sectionRef}
      id="home"
      className="hero-banner relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#092f24] text-[#f6f3eb] sm:min-h-[600px] lg:min-h-[650px]"
    >
      {/* خلفية الصورة مع Parallax ناعم */}
      <motion.img
        src="/assets/madad-hero-warehouse.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        style={{ y: imageY, scale: imageScale }}
        className="hero-banner-image absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      <div className="hero-banner-wash absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-14 lg:py-24">
        <motion.div
          variants={heroContainerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          className="flex max-w-[650px] flex-col justify-center"
        >
          {/* شارة العنوان العلوي مع تمدد الخط الذهبي */}
          <motion.p
            variants={heroItemVariants}
            className="mb-7 flex items-center gap-3 text-[12px] font-bold tracking-[.15em] text-[#e2c37b]"
          >
            <motion.span
              variants={accentLineVariants}
              className="h-px w-8 origin-right bg-[#d7b66f]"
            />
            تجارة الجملة، أقرب وأوضح
          </motion.p>

          {/* العنوان الرئيسي */}
          <motion.h1
            variants={heroItemVariants}
            className="max-w-[650px] text-[40px] font-bold leading-[1.38] tracking-[-.055em] text-[#f6f3eb] sm:text-[52px] lg:text-[66px]"
          >
            نقرّب السوق،
            <br />
            <span className="text-[#c6dfc9]">ونسهّل الوصول.</span>
          </motion.h1>

          {/* الوصف */}
          <motion.p
            variants={heroItemVariants}
            className="mt-6 max-w-[530px] text-[16px] leading-8 text-[#e1e9e2] sm:text-[17px]"
          >
            مداد منصة تجارة جملة سودانية تربط التجار والمشترين بالموردين والمصانع مباشرةً — بخطوات أوضح، ووسطاء أقل، وصعوبة أقل في التوريد.
          </motion.p>

          {/* أزرار الدعوة لاتخاذ إجراء (CTA) */}
          <motion.div
            variants={heroItemVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.a
              data-testid="link-how-hero"
              href="#how"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_SMOOTH }}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f6f3eb] px-6 text-sm font-semibold text-[#05563D] shadow-sm transition-colors hover:bg-white"
            >
              <span>اكتشف كيف نعمل</span>
              <span className="transition-transform duration-200 group-hover:-translate-x-1">
                <ArrowLeft size={17} />
              </span>
            </motion.a>

            <motion.a
              data-testid="link-contact-hero"
              href="#contact"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_SMOOTH }}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/55 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              تعرّف على فرص التعاون
            </motion.a>
          </motion.div>

          {/* مؤشر التمرير السفلي */}
          <motion.div
            variants={heroItemVariants}
            className="mt-10 flex items-center gap-3 text-[12px] text-[#d3ddd5]"
          >
            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, 4, 0],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-[#e2c37b]"
            >
              <ArrowDownLeft size={15} />
            </motion.span>
            {/* <span>من المنتج إلى رفّ الحي، بطريق أوضح</span> */}
          </motion.div>
        </motion.div>
      </div>
    </section>

        <section id="about" className="border-y border-[#e2ded4] bg-[#eeece2]">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-24 lg:px-14 lg:py-28">
            <SectionIntro eyebrow="حكاية مداد" title="من احتياج السوق، تبدأ الفكرة.">
              في التجارة اليومية، الوصول إلى البضاعة المناسبة قد يعني وقتاً أطول وتكلفة أكبر. جاءت مداد لتجعل التواصل بين من يوفّر البضاعة ومن يحتاجها أكثر مباشرة ووضوحاً.
            </SectionIntro>
              <StoryReveal className="flex flex-col justify-center border-r border-[#d6d1c3] pr-6 sm:pr-10">
              <p className="text-lg font-medium leading-[2] text-[#315344] sm:text-[21px]">
                نؤمن أن التجارة الأقوى تبدأ بعلاقة أوضح بين أطرافها؛ لذلك نعمل على تقليل الحلقات غير الضرورية، وتسهيل رحلة التوريد للتاجر، وفتح طريق مباشر للمورد والمصنع إلى السوق.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#05563D]">
                <span className="h-px w-10 bg-[#b89656]" /> مداد — طريق أقرب للتجارة
              </div>
              </StoryReveal>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionIntro eyebrow="كيف تعمل مداد؟" title="رحلة توريد أبسط، من الطرفين.">
              نهيّئ مساحة تجمع احتياج المشتري مع ما يقدمه المورد والمصنع، لتكون خطوات الوصول إلى البضاعة أكثر سهولة وتنظيماً.
            </SectionIntro>
            <StoryReveal as="a" data-testid="link-contact-how" href="#contact" className="mb-2 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#05563D] hover:gap-3 transition-all">اسألنا عن طريقة العمل <ArrowLeft size={16} /></StoryReveal>
          </div>
          <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-3">
            {[
              { n: '01', icon: Store, title: 'التاجر يحدد احتياجه', body: 'يصل تاجر الحي إلى ما يبحث عنه من بضائع بالجملة ضمن تجربة تسهّل الاستكشاف والاختيار.' },
              { n: '02', icon: Boxes, title: 'المورد يعرض ما يوفّره', body: 'مساحة تربط الموردين والمصانع بالمشترين، وتقرّب المنتجات من نقاط الطلب.' },
              { n: '03', icon: Truck, title: 'تواصل أوضح، توريد أسهل', body: 'بدلاً من حلقات طويلة، تقرّب مداد الطرفين وتساعد على جعل رحلة التوريد أكثر مباشرة.' },
            ].map(({ n, icon: Icon, title, body }) => (
              <StoryReveal as="article" key={n} delay={(Number(n) - 1) * 0.12} className="group rounded-2xl border border-[#dcd8cc] bg-white/65 p-6 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#05563D] hover:bg-[#05563D] hover:shadow-lg sm:p-7 lg:p-8">
                <div className="mb-9 flex items-center justify-between">
                  {/* <span className="font-mono text-xs tracking-[.16em] text-[#9b8356] transition-colors group-hover:text-[#d7b66f]">{n} / 03</span> */}
                  <Icon size={23} strokeWidth={1.5} className="text-[#08704e] transition duration-300 group-hover:-translate-y-1 group-hover:text-[#e2c37b]" />
                </div>
                <h3 className="text-xl font-bold text-[#18382d] transition-colors group-hover:text-white">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#6c7b71] transition-colors group-hover:text-[#e1e9e2]">{body}</p>
              </StoryReveal>
            ))}
          </div>
        </section>

        <section className="warehouse-story relative isolate overflow-hidden bg-[#092f24] text-[#f6f3eb]" aria-label="من المخزن إلى نقطة البيع">
          <div className="absolute inset-0">
            <img src="/assets/supplier-warehouse.jpg" alt="صناديق بضائع مرتبة على منصات داخل مستودع" width="1600" height="533" loading="lazy" data-scroll-depth="18" className="story-parallax-image absolute inset-0 h-full w-full object-cover" />
            <div className="warehouse-wash absolute inset-0" />
          </div>
          <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] items-end px-5 pb-12 pt-16 sm:px-8 lg:min-h-[490px] lg:items-center lg:px-14 lg:py-20">
            <StoryReveal className="max-w-xl">
              <p className="mb-4 text-xs font-bold tracking-[.15em] text-[#e2c37b]">من المخزن إلى نقطة البيع</p>
              <h2 className="text-3xl font-bold leading-[1.5] tracking-[-.04em] text-[#f6f3eb] sm:text-4xl md:text-[46px]">رحلة البضاعة أوضح، حين تقصر المسافة.</h2>
              <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#e0e8e1]">حين تكون المنتجات ومصادر التوريد أقرب إلى نقاط الطلب، تصبح رحلة البحث أوضح للمورد والتاجر.</p>
            </StoryReveal>
          </div>
        </section>

        <section id="suppliers" className="bg-[#123c30] text-[#f6f3eb]">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-24 lg:px-14 lg:py-28">
            <StoryReveal className="relative overflow-hidden rounded-sm bg-[#1c4a3b] p-7 sm:p-10 lg:min-h-[370px]">
              <div className="absolute -left-16 -top-14 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -left-4 -top-2 h-40 w-40 rounded-full border border-white/10" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[.13em] text-[#d7b66f]">للمصانع والموردين</span>
                  <Building2 size={24} strokeWidth={1.4} className="text-[#d7b66f]" />
                </div>
                <div className="mt-16">
                  <p className="max-w-md text-[25px] font-semibold leading-[1.65] sm:text-[32px]">قرّب منتجاتك من التجار الذين يبحثون عنها.</p>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#c9d7ce]">مداد تفتح قناة أوضح للتعريف بما تقدّمه، وربطك بتجار الأحياء والمشترين.</p>
                </div>
                <a data-testid="link-contact-supplier" href="#contact" className="mt-9 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#123c30]">تعرّف على التعاون <ArrowLeft size={16} /></a>
              </div>
            </StoryReveal>
            <StoryReveal delay={0.12}>
              <SectionIntro light eyebrow="من الإنتاج إلى السوق" title="فرصة أقرب للوصول إلى المشترين.">
                نعمل على بناء شبكة تصل المصانع والموردين بتجار التجزئة والمشترين. مساحة للتعرّف على المنتجات وتسهيل الوصول إلى مصادر التوريد.
              </SectionIntro>
              <ul className="mt-8 space-y-4">
                {['عرض المنتجات ومصادر التوريد', 'الوصول إلى شريحة أوسع من تجار الأحياء', 'تقليل المسافة بين المنتج ونقطة البيع'].map((item) => <li key={item} className="flex items-center gap-3 text-sm text-[#e1e8df]"><Check size={17} className="text-[#d7b66f]" />{item}</li>)}
              </ul>
            </StoryReveal>
          </div>
        </section>

        <section id="merchants" className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-24 lg:px-14 lg:py-32">
          <div>
            <SectionIntro eyebrow="للتجار والمشترين" title="بضاعة أقرب. ووقت أكثر لشغلك.">
              نعرف أن صاحب المتجر يحتاج خيارات توريد مناسبة وواضحة. مداد تسعى لتسهيل البحث والوصول إلى الموردين، حتى يركّز التاجر على خدمة زبائنه وتطوير شغله.
            </SectionIntro>
            <StoryReveal as="a" data-testid="link-contact-merchant" href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#05563D] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c6b4e]">تواصل معنا عن احتياجك <ArrowLeft size={16} /></StoryReveal>
          </div>
          <StoryReveal className="relative border-y border-[#dcd8cc] py-7">
            <div className="absolute right-0 top-0 h-full w-px bg-[#d7b66f]" />
            {[
              { icon: PackageCheck, title: 'اكتشف خيارات التوريد', body: 'استكشف ما يقدمه الموردون والمصانع من منتجات بالجملة.' },
              { icon: Users, title: 'قارن وتواصل بوضوح', body: 'قرّب المسافة بين احتياج متجرك ومصادر البضاعة.' },
              { icon: Check, title: 'اختر ما يناسب متجرك', body: 'رتّب رحلة الشراء على أساس أوضح ووقت أقل في البحث.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="flex gap-5 py-5 pr-7 sm:gap-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7e8db] text-[#05563D]"><Icon size={19} strokeWidth={1.6} /></span>
                <div><div className="flex items-baseline gap-3"><span className="font-mono text-[10px] text-[#9b8356]">0{i + 1}</span><h3 className="font-bold text-[#244837]">{title}</h3></div><p className="mt-2 text-sm leading-7 text-[#6c7b71]">{body}</p></div>
              </div>
            ))}
          </StoryReveal>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[#e8e5d9]">
          <div className="absolute -left-24 -top-32 h-[430px] w-[430px] rounded-full border border-[#d4d0c2]" />
          <div className="absolute -left-12 -top-20 h-[300px] w-[300px] rounded-full border border-[#d4d0c2]" />
          <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-end md:justify-between lg:px-14 lg:py-28">
            <StoryReveal className="max-w-2xl">
              <p className="mb-4 text-xs font-bold tracking-[.15em] text-[#8d7144]">شراكات وتواصل</p>
              <h2 className="text-3xl font-bold leading-[1.5] tracking-[-.04em] text-[#18382d] sm:text-4xl md:text-[48px]">خلّينا نقرّب<br />الخطوة الجاية.</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#69786e]">سواء كنت مورّداً، مصنعاً، تاجراً، أو جهة مهتمة بالتعاون — يسعدنا نسمع منك ونتعرّف على احتياجك.</p>
            </StoryReveal>
            <StoryReveal as="a" data-testid="link-contact-details" href="#contact-details" className="inline-flex min-h-14 w-fit items-center gap-5 rounded-full bg-[#05563D] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c6b4e]">
              تفاصيل التواصل <ArrowUpLeft size={18} />
            </StoryReveal>
          </div>
          <div id="contact-details" className="relative mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-14">
            <div className="rounded-sm border border-[#d4d0c2] bg-[#f2efe6] p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3 text-sm text-[#3d5b4b]">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[#05563D]" />
                  <span><b dir="ltr" className="mt-1 block font-medium">{DEMO_CONTACT.phone}</b></span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#3d5b4b]">
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-[#05563D]" />
                  <span><b dir="ltr" className="mt-1 block font-medium">{DEMO_CONTACT.whatsapp}</b></span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#3d5b4b]">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[#05563D]" />
                  <span><b dir="ltr" className="mt-1 block font-medium">{DEMO_CONTACT.email}</b></span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#3d5b4b]">
                  {DEMO_CONTACT.social.map((channel) => (
                    <a key={channel.name} data-testid={`link-social-${channel.name.toLowerCase()}`} href={channel.url} target="_blank" rel="noopener noreferrer" aria-label={`${channel.name} — رابط تجريبي`} className="flex items-center gap-2 text-[#3d5b4b] hover:text-[#05563D]">
                      {channel.name === 'Instagram' ? <Instagram size={18} className="text-[#05563D]" /> : <Facebook size={18} className="text-[#05563D]" />}
                      <span className="sr-only">{channel.name}:</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="app-heading" className="relative isolate overflow-hidden border-b border-[#456657] bg-[#123c30] text-[#f6f3eb]">
          <img src="/assets/market-trade.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-[.16]" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#092f24]/95 via-[#123c30]/90 to-[#123c30]/75" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:gap-20 lg:px-14 lg:py-24">
            <StoryReveal className="max-w-xl">
              <p className="inline-flex rounded-full border border-[#d7b66f]/45 bg-[#d7b66f]/10 px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#e2c37b]">قريباً على هاتفك</p>
              <h2 id="app-heading" className="mt-4 text-3xl font-bold leading-[1.5] text-[#f6f3eb] sm:text-4xl">مداد معاك في كل خطوة.</h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#d5e0d8]">نطوّر تجربة تقرّب التاجر من المورد وتسهّل اكتشاف خيارات التوريد.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <StoreBadge platform="App Store" href={APP_STORE_SEARCH_URL} testId="link-app-store" />
                <StoreBadge platform="Google Play" href={GOOGLE_PLAY_SEARCH_URL} testId="link-google-play" />
              </div>
            </StoryReveal>

            <div className="relative mx-auto flex w-full max-w-[470px] items-center justify-center py-2" aria-label="معاينة توضيحية لواجهة تطبيق مداد">
              <div className="absolute h-[270px] w-[270px] rounded-full bg-[#d7b66f]/10 blur-3xl" aria-hidden="true" />
              <div className="relative w-[238px] rotate-[-3deg] rounded-[40px] border-[6px] border-[#071f18] bg-[#071f18] p-2 shadow-[0_28px_70px_rgba(0,0,0,.4)] transition-transform duration-500 hover:rotate-0">
                <div className="overflow-hidden rounded-[30px] bg-[#f6f3eb] px-4 pb-5 pt-3 text-[#18382d]" dir="rtl">
                  <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#18382d]/25" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/assets/madad-logo.svg" alt="" className="h-6 w-6 object-contain" />
                      <span className="text-sm font-bold text-[#05563D]">مداد</span>
                    </div>
                    <span className="rounded-full bg-[#e8e5d9] px-2 py-1 text-[9px] text-[#6c7b71]">للتجار</span>
                  </div>
                  <p className="mt-5 text-[15px] font-bold">خلّ التوريد أقرب.</p>
                  <p className="mt-1 text-[10px] text-[#6c7b71]">اكتشف مصادر ومنتجات بالجملة</p>
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-[#dcd8cc] bg-white px-3 py-2.5 text-[10px] text-[#7a867b]">
                    <span>ابحث عن منتج أو مورد</span><ArrowLeft size={13} className="text-[#05563D]" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold">تصفّح الأقسام</span>
                    <span className="text-[9px] text-[#8d7144]">عرض الكل</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[9px]">
                    {[
                      { icon: Store, label: 'متاجر' },
                      { icon: Boxes, label: 'منتجات' },
                      { icon: PackageCheck, label: 'توريد' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="rounded-xl bg-[#e8e5d9] px-1 py-2.5">
                        <Icon size={16} className="mx-auto mb-1 text-[#08704e]" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl border border-[#e4e0d5] bg-white p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8e5d9] text-[#08704e]"><Boxes size={16} /></span>
                      <span className="text-[10px] font-semibold">مصادر توريد قريبة</span>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-[#e8e5d9]" />
                    <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-[#e8e5d9]" />
                  </div>
                </div>
              </div>
              <span className="absolute bottom-0 rounded-full border border-white/15 bg-[#092f24]/80 px-3 py-1 text-[10px] text-[#c9d7ce] backdrop-blur">معاينة توضيحية</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#123c30] text-[#f6f3eb]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-14">
          <Brand light />
          <nav aria-label="روابط أسفل الصفحة" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#cfdbd3]">
            {navItems.map(([label, href]) => <a key={href} data-testid={`link-footer-${href.slice(1)}`} href={href} className="transition hover:text-white">{label}</a>)}
          </nav>
          <p className="text-xs text-[#aebfb4]">© {new Date().getFullYear()} مداد. كل الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
