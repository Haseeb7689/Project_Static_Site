"use client";

import "../i18n";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../logo/favicon.png";
import { AnimatePresence, motion, animate } from "framer-motion";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const services = [
  {
    title: "services.gas_billing_title",
    description: "services.gas_billing_description",
    icon: "🔥",
  },
  {
    title: "services.easypaisa_jazzcash_title",
    description: "services.easypaisa_jazzcash_description",
    icon: "💸",
  },
  {
    title: "services.easyload_title",
    description: "services.easyload_description",
    icon: "📱",
  },
  {
    title: "services.e_sahulat_title",
    description: "services.e_sahulat_description",
    icon: "🛒",
  },
];

const faqs = [
  {
    question: "faqs.working_hours.question",
    answer: "faqs.working_hours.answer",
  },
  {
    question: "faqs.shop_location.question",
    answer: "faqs.shop_location.answer",
  },
  {
    question: "faqs.service_charge.question",
    answer: "faqs.service_charge.answer",
  },
  {
    question: "faqs.contact.question",
    answer: "faqs.contact.answer",
  },
  {
    question: "faqs.online_payments.question",
    answer: "faqs.online_payments.answer",
  },
  {
    question: "faqs.receipt.question",
    answer: "faqs.receipt.answer",
  },
  {
    question: "faqs.weekend_service.question",
    answer: "faqs.weekend_service.answer",
  },
  {
    question: "faqs.data_safety.question",
    answer: "faqs.data_safety.answer",
  },
];

const navLinks = [
  t("nav.home"),
  t("nav.about"),
  t("nav.services"),
  t("nav.faqs"),
  t("nav.contact"),
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [lang, setLang] = useState(i18n.language);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 3;

  const toggleShowAll = () => setShowAll((prev) => !prev);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupService, setPopupService] = useState<{
    title: string;
    description: string;
    icon: string;
  } | null>(null);

  function handleSmoothScrollToId(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 160;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    animate(window.pageYOffset, offsetPosition, {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(value) {
        window.scrollTo(0, value);
      },
    });
  }
  function onNavLinkClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    handleSmoothScrollToId(id);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }
  function toggleLanguageWithAnimation() {
    setIsAnimating(true);
  }

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        const newLang = lang === "en" ? "ur" : "en";
        i18n.changeLanguage(newLang);
        setLang(newLang);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, i18n, lang]);

  useEffect(() => {
    if (popupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [popupOpen]);

  return (
    <div
      dir={i18n.language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 scroll-smooth"
    >
      <button
        onClick={toggleLanguageWithAnimation}
        className={`fixed cursor-pointer top-30 bg-blue-600 text-white px-3 py-1.5 rounded z-50 shadow-sm text-sm mb-5
    ${i18n.language === "en" ? "right-5" : "left-5"}`}
        aria-label="Toggle Language"
      >
        {i18n.language === "en" ? "اردو" : "English"}
      </button>

      <AnimatePresence mode="wait">
        {!isAnimating && (
          <motion.div
            key={lang}
            dir={lang === "ur" ? "rtl" : "ltr"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50 scroll-smooth"
          >
            <header className="fixed w-full bg-white shadow z-40">
              <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8 relative">
                <motion.div
                  className="flex-shrink-0 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <Image
                    src={logo}
                    alt="Mujahid Jazzcash Logo"
                    width={80}
                    height={80}
                  />
                </motion.div>

                <nav className="hidden md:flex  absolute left-1/2 transform -translate-x-1/2 gap-10 items-center">
                  {navLinks.map((link) =>
                    link === "Services" ? (
                      <div
                        key="Services"
                        className="relative cursor-pointer"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        <motion.span
                          className="flex items-center text-blue-500 text-2xl"
                          whileHover={{ scale: 1.1, color: "#2563eb" }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {t(`nav.${link.toLowerCase()}`)}
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ rotate: servicesOpen ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.span>

                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 bg-white border rounded shadow-md mt-2 w-56 z-50"
                            >
                              {services.map((service) => (
                                <a
                                  key={service.title}
                                  onClick={(e) => onNavLinkClick(e, "services")}
                                  href="#services"
                                  className="block px-4 py-2 hover:bg-blue-100 text-blue-600"
                                >
                                  {t(service.title)}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        onClick={(e) => onNavLinkClick(e, link.toLowerCase())}
                        className="text-blue-500 text-2xl cursor-pointer"
                        whileHover={{ scale: 1.1, color: "#2563eb" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {t(`nav.${link.toLowerCase()}`)}
                      </motion.a>
                    )
                  )}
                </nav>

                <div className="md:hidden">
                  <button
                    aria-label="Toggle menu"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="focus:outline-none cursor-pointer"
                  >
                    <motion.div
                      initial={false}
                      animate={mobileOpen ? "open" : "closed"}
                      variants={{
                        closed: { rotate: 0 },
                        open: { rotate: 45, y: 6 },
                      }}
                      className="w-6 h-0.5 bg-blue-500 mb-1 rounded"
                    />
                    <motion.div
                      initial={false}
                      animate={mobileOpen ? "open" : "closed"}
                      variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                      }}
                      className="w-6 h-0.5 bg-blue-500 mb-1 rounded"
                    />
                    <motion.div
                      initial={false}
                      animate={mobileOpen ? "open" : "closed"}
                      variants={{
                        closed: { rotate: 0 },
                        open: { rotate: -45, y: -6 },
                      }}
                      className="w-6 h-0.5 bg-blue-500 rounded"
                    />
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {mobileOpen && (
                  <motion.nav
                    className="md:hidden bg-white shadow-md border-t border-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {navLinks.map((link) =>
                      link === "Services" ? (
                        <div key={link} className="border-b border-gray-200">
                          <button
                            onClick={() =>
                              setMobileServicesOpen(!mobileServicesOpen)
                            }
                            className="w-full flex justify-between items-center cursor-pointer px-4 py-3 text-blue-500 text-lg font-semibold focus:outline-none"
                          >
                            {t(`nav.${link.toLowerCase()}`)}
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          </button>

                          <AnimatePresence initial={false}>
                            {mobileServicesOpen && (
                              <motion.div
                                key="submenu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                style={{ overflow: "hidden" }}
                                className="pl-6"
                              >
                                {services.map((service) => (
                                  <a
                                    key={service.title}
                                    href="#services"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2 border-b border-gray-100 text-blue-500 hover:text-blue-600"
                                  >
                                    {t(service.title)}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.a
                          key={link}
                          href={`#${link.toLowerCase()}`}
                          className={`block px-4 py-3 border-b border-gray-200 text-blue-500 hover:text-blue-600 text-lg ${
                            link === "contact" ? "border-b-0" : ""
                          }`}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(`nav.${link.toLowerCase()}`)}
                        </motion.a>
                      )
                    )}
                  </motion.nav>
                )}
              </AnimatePresence>
            </header>

            <section
              id="home"
              className="pt-24 min-h-screen  flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-4 text-center"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-4"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("home_title")}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl max-w-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t("home_description")}
              </motion.p>
              <motion.a
                href="https://wa.me/923077733622"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg inline-flex items-center gap-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                aria-label="Contact via WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 0 5.37 0 12a11.9 11.9 0 001.63 6.07L0 24l5.94-1.58A11.88 11.88 0 0012 24c6.63 0 12-5.37 12-12 0-3.22-1.28-6.26-3.48-8.52zm-8.52 17.04a9.07 9.07 0 01-4.88-1.35l-.35-.21-3.54.94.94-3.45-.22-.36a9.12 9.12 0 01-1.36-4.89c0-5.03 4.1-9.13 9.14-9.13a9.1 9.1 0 016.45 2.66 9.06 9.06 0 012.69 6.47 9.13 9.13 0 01-9.13 9.11zm5.24-6.95c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.15-.67.15s-.77.94-.95 1.13c-.18.18-.35.2-.64.07a8.45 8.45 0 01-2.49-1.54 9.43 9.43 0 01-1.75-2.17c-.18-.3 0-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.18.05-.34-.02-.48-.07-.13-.67-1.6-.92-2.2-.24-.58-.48-.5-.66-.5-.18 0-.38 0-.57 0-.18 0-.48.07-.73.35s-.96.94-.96 2.3c0 1.36.98 2.68 1.12 2.87.14.18 1.94 3 4.7 4.2a16.17 16.17 0 002.14.9c.9.36 1.72.29 2.37.18.72-.13 2.22-.9 2.53-1.77.31-.88.31-1.63.22-1.78-.1-.15-.26-.24-.55-.38z" />
                </svg>
                {t("whatsapp")}
              </motion.a>
            </section>

            <section
              id="about"
              className="max-w-4xl mx-auto px-4 my-20 text-center scroll-mt-40"
            >
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                {t("about_title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">{t("about_text")}</p>
            </section>

            <section
              id="services"
              className="max-w-6xl mx-auto px-4 my-20 scroll-mt-40"
            >
              <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
                {t("services_title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {services.map((service) => (
                  <motion.div
                    key={service.title}
                    className="snake-border cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundImage:
                        "linear-gradient(to right, #22c55e 25%, transparent 25%, transparent 50%, #22c55e 50%, #22c55e 75%, transparent 75%, transparent)",
                      transition: { duration: 0.5 },
                    }}
                    onClick={() => {
                      setPopupService(service);
                      setPopupOpen(true);
                    }}
                  >
                    <div className="content p-6 rounded shadow-md text-center">
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">
                        {t(service.title)}
                      </h3>
                      <p className="text-gray-700">{t(service.description)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section
              id="faqs"
              className="max-w-4xl mx-auto px-4 my-20 scroll-mt-20"
              aria-label="Frequently Asked Questions"
            >
              <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                {t("faqs_title")}
              </h2>

              <div className="max-w-3xl mx-auto text-left text-gray-700 space-y-4">
                {/* Always visible FAQs */}
                {faqs
                  .slice(0, visibleCount)
                  .map(({ question, answer }, index) => (
                    <motion.div
                      key={question}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`pb-4 ${
                        index === visibleCount - 1
                          ? ""
                          : "border-b border-gray-300"
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-1 text-blue-500">
                        {t(question)}
                      </h3>
                      <p>{t(answer)}</p>
                    </motion.div>
                  ))}

                {/* AnimatePresence for extra FAQs */}
                <AnimatePresence>
                  {showAll &&
                    faqs.slice(visibleCount).map(({ question, answer }) => (
                      <motion.div
                        key={question}
                        initial={{
                          opacity: 0,
                          height: 0,
                          marginTop: 0,
                          paddingTop: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          marginTop: 16,
                          paddingTop: 16,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginTop: 0,
                          paddingTop: 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="border-t border-gray-300 pt-4"
                      >
                        <h3 className="font-semibold text-lg mb-1 text-blue-500">
                          {t(question)}
                        </h3>
                        <p> {t(answer)}</p>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={toggleShowAll}
                  className="inline-flex cursor-pointer items-center gap-2 px-6 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  aria-expanded={showAll}
                  aria-controls="additional-faqs"
                >
                  {showAll
                    ? t("more.showLess")
                    : t("more.showMore", { count: faqs.length - visibleCount })}

                  <motion.span
                    animate={{ rotate: showAll ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  >
                    ▼
                  </motion.span>
                </button>
              </div>
            </section>

            <section
              id="contact"
              className="max-w-4xl mx-auto px-4 my-20 text-center"
            >
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                {t("contact_title")}
              </h2>
              <p className="text-gray-700 mb-3">{t("contact_shop")}</p>
              <p className="text-gray-700 mb-3">Phone: 0307-7733622</p>
              <a
                href="https://wa.me/923077733622"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition"
                aria-label="WhatsApp Contact"
              >
                {t("contact_whatsapp")}
                <span className="ml-2 mr-2">📱</span>
              </a>
            </section>

            <footer className="mt-20 text-center py-6 text-gray-600 text-sm bg-gray-50">
              &copy; {new Date().getFullYear()} Mujahid Jazzcash and Easypaisa
              Shop | Contact: 0307-7733622
            </footer>

            <motion.a
              href="https://wa.me/923077733622"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-50"
              aria-label="WhatsApp Contact"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 0 5.37 0 12a11.9 11.9 0 001.63 6.07L0 24l5.94-1.58A11.88 11.88 0 0012 24c6.63 0 12-5.37 12-12 0-3.22-1.28-6.26-3.48-8.52zm-8.52 17.04a9.07 9.07 0 01-4.88-1.35l-.35-.21-3.54.94.94-3.45-.22-.36a9.12 9.12 0 01-1.36-4.89c0-5.03 4.1-9.13 9.14-9.13a9.1 9.1 0 016.45 2.66 9.06 9.06 0 012.69 6.47 9.13 9.13 0 01-9.13 9.11zm5.24-6.95c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.15-.67.15s-.77.94-.95 1.13c-.18.18-.35.2-.64.07a8.45 8.45 0 01-2.49-1.54 9.43 9.43 0 01-1.75-2.17c-.18-.3 0-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.18.05-.34-.02-.48-.07-.13-.67-1.6-.92-2.2-.24-.58-.48-.5-.66-.5-.18 0-.38 0-.57 0-.18 0-.48.07-.73.35s-.96.94-.96 2.3c0 1.36.98 2.68 1.12 2.87.14.18 1.94 3 4.7 4.2a16.17 16.17 0 002.14.9c.9.36 1.72.29 2.37.18.72-.13 2.22-.9 2.53-1.77.31-.88.31-1.63.22-1.78-.1-.15-.26-.24-.55-.38z" />
              </svg>
            </motion.a>
            <AnimatePresence>
              {popupOpen && popupService && (
                <motion.div
                  className="fixed inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setPopupOpen(false)}
                >
                  <motion.div
                    className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setPopupOpen(false)}
                      aria-label="Close popup"
                      className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    >
                      &times;
                    </button>

                    <div className="mx-auto mb-4 w-24 h-24 relative">
                      <Image
                        src={logo}
                        alt="Shop Logo"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-blue-600 mb-2">
                      Mujahid Jazzcash & Easypaisa Shop
                    </h3>

                    <p className="text-gray-700 mb-6 px-4">
                      Trusted services for all your Jazzcash, Easypaisa, gas
                      billing, easyload, and e sahulat needs.
                    </p>

                    <a
                      href="https://wa.me/923077733622"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-8 py-4 shadow-lg transition"
                      aria-label={`Contact Mujahid Jazzcash & Easypaisa Shop on WhatsApp about ${popupService.title}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 0 5.37 0 12a11.9 11.9 0 001.63 6.07L0 24l5.94-1.58A11.88 11.88 0 0012 24c6.63 0 12-5.37 12-12 0-3.22-1.28-6.26-3.48-8.52zm-8.52 17.04a9.07 9.07 0 01-4.88-1.35l-.35-.21-3.54.94.94-3.45-.22-.36a9.12 9.12 0 01-1.36-4.89c0-5.03 4.1-9.13 9.14-9.13a9.1 9.1 0 016.45 2.66 9.06 9.06 0 012.69 6.47 9.13 9.13 0 01-9.13 9.11zm5.24-6.95c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.15-.67.15s-.77.94-.95 1.13c-.18.18-.35.2-.64.07a8.45 8.45 0 01-2.49-1.54 9.43 9.43 0 01-1.75-2.17c-.18-.3 0-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.18.05-.34-.02-.48-.07-.13-.67-1.6-.92-2.2-.24-.58-.48-.5-.66-.5-.18 0-.38 0-.57 0-.18 0-.48.07-.73.35s-.96.94-.96 2.3c0 1.36.98 2.68 1.12 2.87.14.18 1.94 3 4.7 4.2a16.17 16.17 0 002.14.9c.9.36 1.72.29 2.37.18.72-.13 2.22-.9 2.53-1.77.31-.88.31-1.63.22-1.78-.1-.15-.26-.24-.55-.38z" />
                      </svg>
                      Contact on WhatsApp
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
