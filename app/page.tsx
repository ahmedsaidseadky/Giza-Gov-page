"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  X,
  Search,
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Users,
  Building2,
  Landmark,
  FileText,
  Heart,
  GraduationCap,
  Briefcase,
  Home,
  Car,
  Leaf,
  Droplets,
  Shield,
  Send,
  Stethoscope,
  Zap,
  Flame,
  Wifi,
  Plane,
  Hotel,
  BedDouble,
  DollarSign,
  TrendingUp,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Compass,
  Factory,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// بيانات شريط الأخبار
const breakingNews = [
  "محافظ الجيزة يفتتح مشروعات تنموية جديدة بقيمة 500 مليون جنيه",
  "انطلاق فعاليات مهرجان الأهرامات الدولي للموسيقى",
  "الانتهاء من تطوير 15 منطقة عشوائية بالمحافظة",
  "افتتاح المتحف المصري الكبير قريباً",
  "محافظة الجيزة تحتل المركز الأول في معدلات التنمية",
];

// بيانات القيادات
const leaders = [
  { name: "السيد المهندس/ عادل سعيد إبراهيم النجار", title: "محافظ الجيزة" },
  { name: "الأستاذ/ إبراهيم ناجي الشهابي", title: "نائب السيد المحافظ" },
  { name: "الأستاذة/ هند محمد أحمد عبدالحليم", title: "نائبة السيد المحافظ" },
  { name: "السيد الأستاذ/ محمد نور الدين أحمد محمود", title: "السكرتير العام" },
  { name: "السيد الأستاذ / محمد مرعى", title: "السكرتير العام المساعد" },
];

// بيانات الإعلانات
const advertisements = [
  {
    id: 1,
    company: "Vodafone",
    title: "عروض فودافون الحصرية",
    description: "باقات إنترنت غير محدودة بأسعار مميزة",
    bgColor: "from-red-600 to-red-700",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/1200px-Vodafone_icon.svg.png",
  },
  {
    id: 2,
    company: "Orange",
    title: "عروض أورانج المميزة",
    description: "تمتع بأفضل تغطية شبكة في مصر",
    bgColor: "from-orange-500 to-orange-600",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png",
  },
  {
    id: 3,
    company: "Etisalat",
    title: "عروض اتصالات المتميزة",
    description: "سرعات فائقة وباقات متنوعة تناسب احتياجاتك",
    bgColor: "from-green-600 to-green-700",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Etisalat_logo.svg/1200px-Etisalat_logo.svg.png",
  },
];

// بيانات الخدمات الإلكترونية
const services = [
  { icon: FileText, title: "التراخيص", desc: "استخراج وتجديد التراخيص", color: "from-blue-500 to-blue-600" },
  { icon: Home, title: "التصالح في مخالفات البناء", desc: "تقديم طلبات التصالح", color: "from-green-500 to-green-600" },
  { icon: Car, title: "المرور", desc: "خدمات تراخيص المركبات", color: "from-red-500 to-red-600" },
  { icon: GraduationCap, title: "التعليم", desc: "خدمات المدارس والتنسيق", color: "from-purple-500 to-purple-600" },
  { icon: Stethoscope, title: "الصحة", desc: "الخدمات الصحية", color: "from-teal-500 to-teal-600" },
  { icon: Building2, title: "السجل العيني", desc: "خدمات الشهر العقاري", color: "from-orange-500 to-orange-600" },
];

// بيانات دفع الفواتير
const billServices = [
  { icon: Zap, title: "الكهرباء", provider: "شركة جنوب القاهرة", color: "from-yellow-400 to-yellow-500" },
  { icon: Phone, title: "التليفون الأرضي", provider: "المصرية للاتصالات", color: "from-blue-400 to-blue-500" },
  { icon: Droplets, title: "المياه", provider: "مياه الجيزة", color: "from-cyan-400 to-cyan-500" },
  { icon: Flame, title: "الغاز الطبيعي", provider: "بتروتريد", color: "from-orange-400 to-orange-500" },
  { icon: Wifi, title: "الإنترنت", provider: "WE - فودافون - أورانج", color: "from-purple-400 to-purple-500" },
];

// المناطق السياحية مع إحداثيات الخريطة
const touristSpots = [
  { name: "أهرامات الجيزة", type: "أثري", desc: "من عجائب الدنيا السبع", lat: 29.9792, lng: 31.1342, zoom: 15 },
  { name: "أبو الهول", type: "أثري", desc: "أكبر تمثال منحوت", lat: 29.9753, lng: 31.1376, zoom: 17 },
  { name: "المتحف المصري الكبير", type: "متحف", desc: "أكبر متحف أثري", lat: 29.9949, lng: 31.1171, zoom: 16 },
  { name: "منطقة سقارة", type: "أثري", desc: "الهرم المدرج", lat: 29.8713, lng: 31.2165, zoom: 15 },
  { name: "حديقة الحيوان", type: "ترفيهي", desc: "أقدم حديقة في أفريقيا", lat: 30.0260, lng: 31.2176, zoom: 16 },
  { name: "قرية الحرانية", type: "حرفي", desc: "السجاد اليدوي", lat: 29.9543, lng: 31.2098, zoom: 15 },
];

// المناطق الصناعية والاستثمارية مع إحداثيات الخريطة
const industrialZones = [
  { name: "المنطقة الصناعية بأبو رواش", type: "صناعية", area: "5,000 فدان", lat: 30.0833, lng: 31.0667, zoom: 13 },
  { name: "مدينة 6 أكتوبر الصناعية", type: "صناعية", area: "12,000 فدان", lat: 29.9285, lng: 30.9188, zoom: 12 },
  { name: "الشيخ زايد الاستثمارية", type: "استثمارية", area: "8,000 فدان", lat: 30.0392, lng: 30.9806, zoom: 13 },
  { name: "المنطقة الحرة بالجيزة", type: "حرة", area: "1,500 فدان", lat: 30.0131, lng: 31.2089, zoom: 14 },
  { name: "مدينة الإنتاج الإعلامي", type: "إعلامية", area: "2,000 فدان", lat: 30.0489, lng: 30.9422, zoom: 14 },
];

// بيانات مؤشرات السياحة
const tourismStats = [
  { icon: Plane, value: "15", unit: "مليون", label: "زائر سنوياً", color: "bg-gradient-to-br from-amber-100 to-amber-200", iconBg: "bg-amber-500" },
  { icon: Hotel, value: "285", unit: "فندق", label: "فنادق ومنتجعات", color: "bg-gradient-to-br from-emerald-100 to-emerald-200", iconBg: "bg-emerald-500" },
  { icon: BedDouble, value: "45", unit: "ألف", label: "غرفة فندقية", color: "bg-gradient-to-br from-blue-100 to-blue-200", iconBg: "bg-blue-500" },
  { icon: DollarSign, value: "8.5", unit: "مليار $", label: "عائدات السياحة", color: "bg-gradient-to-br from-purple-100 to-purple-200", iconBg: "bg-purple-500" },
  { icon: TrendingUp, value: "12%", unit: "", label: "نسبة النمو السنوي", color: "bg-gradient-to-br from-rose-100 to-rose-200", iconBg: "bg-rose-500" },
  { icon: Globe, value: "25", unit: "مليون", label: "ليلة سياحية", color: "bg-gradient-to-br from-cyan-100 to-cyan-200", iconBg: "bg-cyan-500" },
];

// بيانات الرسوم البيانية
const visitorsData = [
  { year: "2019", visitors: 12 },
  { year: "2020", visitors: 4 },
  { year: "2021", visitors: 7 },
  { year: "2022", visitors: 11 },
  { year: "2023", visitors: 13 },
  { year: "2024", visitors: 15 },
];

const hotelRevenueData = [
  { year: "2019", revenue: 6.2 },
  { year: "2020", revenue: 2.1 },
  { year: "2021", revenue: 4.5 },
  { year: "2022", revenue: 6.8 },
  { year: "2023", revenue: 7.5 },
  { year: "2024", revenue: 8.5 },
];

const occupancyData = [
  { name: "2024", value: 72, fill: "#f59e0b" },
  { name: "2023", value: 68, fill: "#3b82f6" },
  { name: "2022", value: 62, fill: "#10b981" },
  { name: "2021", value: 45, fill: "#8b5cf6" },
];

// بيانات الأخبار
const news = [
  { title: "افتتاح مشروع تطوير محور 26 يوليو", date: "15 يناير 2026" },
  { title: "محافظ الجيزة يتفقد أعمال تطوير كورنيش النيل", date: "14 يناير 2026" },
  { title: "انطلاق حملة تشجير واسعة بأحياء المحافظة", date: "13 يناير 2026" },
];

// معلومات التواصل الثابتة
const contactInfo = {
  portalPhones: ["33778579", "33778576"],
  portalEmail: "gizaportal@idsc.net.eg",
  citizenService: "35733197",
  hotline: "114",
  operationsRoom: ["35863004", "35869193", "35869371"],
  switchboard: "37794876",
  address: "406 شارع الأهرام",
  complaintsPortal: "http://www.shakwa.eg/GCP/Default.aspx",
};

// روابط السوشال ميديا الرسمية
const socialLinks = [
  { 
    icon: Facebook, 
    url: "https://www.facebook.com/p/%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9-%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9-100069296826007/?locale=ar_AR", 
    name: "Facebook", 
    color: "bg-blue-600 hover:bg-blue-700",
    qrValue: "facebook-giza"
  },
  { 
    icon: Twitter, 
    url: "https://x.com/gizagovernorate", 
    name: "X (Twitter)", 
    color: "bg-gray-900 hover:bg-black",
    qrValue: "twitter-giza"
  },
  { 
    icon: Youtube, 
    url: "https://www.youtube.com/channel/UCAhssDUpB_BweevZ1h77KAw", 
    name: "YouTube", 
    color: "bg-red-600 hover:bg-red-700",
    qrValue: "youtube-giza"
  },
];

export default function GizaPortal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "مرحباً بك في البوابة الإلكترونية لمحافظة الجيزة! كيف يمكنني مساعدتك؟" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [newsIndex, setNewsIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);
  const [mapType, setMapType] = useState<"tourist" | "industrial">("tourist");
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; zoom: number } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % advertisements.length);
    }, 5000);
    return () => clearInterval(adInterval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text: chatInput }]);

    setTimeout(() => {
      let response = "شكراً لتواصلك معنا. للمزيد من المساعدة اتصل بالخط الساخن 114";
      const input = chatInput.toLowerCase();
      if (input.includes("خدم")) response = "يمكنك الاطلاع على الخدمات من قسم الخدمات الإلكترونية بالصفحة.";
      else if (input.includes("تواصل") || input.includes("رقم")) response = `الخط الساخن: 114 - خدمة المواطنين: ${contactInfo.citizenService} - البريد: ${contactInfo.portalEmail}`;
      else if (input.includes("أهرام") || input.includes("سياح")) response = "الأهرامات مفتوحة يومياً من 8ص حتى 5م. التذكرة للمصريين 40 جنيه.";
      else if (input.includes("محافظ")) response = "محافظ الجيزة: اللواء أ.ح/ أحمد راشد عبد الفتاح";
      else if (input.includes("شكوى") || input.includes("شكاوى")) response = `يمكنك تقديم شكواك عبر بوابة الشكاوى الحكومية: ${contactInfo.complaintsPortal}`;
      setChatMessages((prev) => [...prev, { from: "bot", text: response }]);
    }, 800);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* شريط الأخبار العاجل */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="flex items-center gap-4 px-4 max-w-7xl mx-auto">
          <span className="bg-white text-red-600 px-3 py-1 rounded text-sm font-bold whitespace-nowrap animate-pulse">
            عاجل
          </span>
          <div className="overflow-hidden flex-1">
            <p className="whitespace-nowrap text-sm">{breakingNews[newsIndex]}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">محافظة الجيزة</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">البوابة الإلكترونية الرسمية</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {[
                { name: "الرئيسية", id: "hero" },
                { name: "عن المحافظة", id: "about" },
                { name: "القيادات", id: "leaders" },
                { name: "الخدمات", id: "services" },
                { name: "السياحة", id: "tourism" },
                { name: "شكاوى المواطنين", id: "complaints" },
                { name: "الاستثمار", id: "investment" },
                { name: "اتصل بنا", id: "contact" },
              ].map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition text-sm font-medium">
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="بحث..." className="bg-transparent border-none outline-none mr-2 w-32 text-sm dark:text-white" />
              </div>
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 py-4 px-4">
            <nav className="flex flex-col gap-3">
              {[
                { name: "الرئيسية", id: "hero" },
                { name: "عن المحافظة", id: "about" },
                { name: "القيادات", id: "leaders" },
                { name: "الخدمات", id: "services" },
                { name: "السياحة", id: "tourism" },
                { name: "شكاوى المواطنين", id: "complaints" },
                { name: "الاستثمار", id: "investment" },
                { name: "اتصل بنا", id: "contact" },
              ].map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-2">{item.name}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-[550px] overflow-hidden">
        <img src="/images/giza-pyramids-hero.jpg" alt="أهرامات الجيزة" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <span className="bg-amber-500/90 px-4 py-1 rounded-full text-sm font-medium mb-4">أرض الحضارة والتاريخ</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">مرحباً بكم في محافظة الجيزة</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">موطن الأهرامات وأبو الهول - بوابة مصر إلى العالم</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">استكشف الخدمات</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 bg-transparent">تعرف على المحافظة</Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-6 bg-gradient-to-r from-amber-500 to-amber-600 -mt-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            <div><div className="text-3xl font-bold">9.5M</div><div className="opacity-90 text-sm">نسمة</div></div>
            <div><div className="text-3xl font-bold">85,153</div><div className="opacity-90 text-sm">كم²</div></div>
            <div><div className="text-3xl font-bold">13</div><div className="opacity-90 text-sm">مركز وحي</div></div>
            <div><div className="text-3xl font-bold">7</div><div className="opacity-90 text-sm">معالم عالمية</div></div>
          </div>
        </div>
      </section>

      {/* About Section - حدود المحافظة */}
      <section id="about" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1 rounded-full text-sm font-medium">تعرف علينا</span>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">عن محافظة الجيزة</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">محافظة الجيزة هي إحدى محافظات مصر، وتضم أهم المعالم الأثرية في العالم</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <CardTitle className="flex items-center gap-2"><Compass className="w-5 h-5" /> الحدود الجغرافية</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">ش</div>
                  <div><div className="font-bold text-gray-800 dark:text-white">شمالاً</div><div className="text-gray-600 dark:text-gray-400 text-sm">محافظتا القاهرة والقليوبية</div></div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">ج</div>
                  <div><div className="font-bold text-gray-800 dark:text-white">جنوباً</div><div className="text-gray-600 dark:text-gray-400 text-sm">محافظتا الفيوم وبني سويف</div></div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">شر</div>
                  <div><div className="font-bold text-gray-800 dark:text-white">شرقاً</div><div className="text-gray-600 dark:text-gray-400 text-sm">نهر النيل ومحافظة القاهرة</div></div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">غ</div>
                  <div><div className="font-bold text-gray-800 dark:text-white">غرباً</div><div className="text-gray-600 dark:text-gray-400 text-sm">محافظة مطروح والصحراء الغربية</div></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5" /> معلومات عامة</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    ["العاصمة", "مدينة الجيزة"],
                    ["عدد السكان", "9.5 مليون نسمة"],
                    ["المساحة", "85,153 كم²"],
                    ["عدد المراكز", "9 مراكز"],
                    ["عدد الأحياء", "4 أحياء"],
                    ["المدن الجديدة", "3 مدن"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center border-b dark:border-gray-700 pb-2 last:border-0">
                      <span className="text-gray-600 dark:text-gray-400">{label}</span>
                      <span className="font-bold text-gray-800 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      <section id="leaders" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1 rounded-full text-sm font-medium">القيادات</span>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">قيادات محافظة الجيزة</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {leaders.map((leader, index) => (
              <Card key={index} className="text-center border-0 shadow-lg overflow-hidden group hover:shadow-xl transition dark:bg-gray-800">
                <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600" />
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white min-h-[3rem]">{leader.name || "---"}</h3>
                  <p className="text-amber-600 dark:text-amber-400 text-sm">{leader.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="http://giza.gov.eg/Goffice/Gov/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              المزيد عن قيادات المحافظة
            </a>
          </div>
        </div>
      </section>

      {/* Ads Carousel Section */}
      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">إعلانات</span>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${adIndex * 100}%)` }}
            >
              {advertisements.map((ad) => (
                <div 
                  key={ad.id}
                  className={`w-full flex-shrink-0 bg-gradient-to-r ${ad.bgColor} p-8 md:p-12`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg">
                        <img 
                          src={ad.logo || "/placeholder.svg"} 
                          alt={ad.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm opacity-80 mb-1">{ad.company}</p>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{ad.title}</h3>
                        <p className="text-white/90">{ad.description}</p>
                      </div>
                    </div>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-xl shadow-lg">
                      اعرف المزيد
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {advertisements.map((ad, index) => (
                <button
                  key={ad.id}
                  onClick={() => setAdIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    adIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setAdIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 rotate-180" />
            </button>
            <button
              onClick={() => setAdIndex((prev) => (prev + 1) % advertisements.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition"
              aria-label="Next slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Electronic Services - Grayscale to Color */}
      <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1 rounded-full text-sm font-medium">خدماتنا</span>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">الخدمات الإلكترونية</h2>
            <p className="text-gray-600 dark:text-gray-400">أنجز معاملاتك بسهولة من منزلك</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden transition-all duration-300 grayscale hover:grayscale-0 hover:shadow-xl hover:-translate-y-1 border-0 dark:bg-gray-900">
                <CardContent className="p-5 text-center">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1">{service.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bill Payment Services */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-amber-500/20 text-amber-400 px-4 py-1 rounded-full text-sm font-medium">دفع الفواتير</span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-2">ادفع فواتيرك إلكترونياً</h2>
            <p className="text-gray-400">ادفع جميع فواتيرك من مكان واحد بكل سهولة وأمان</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {billServices.map((bill, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300 grayscale hover:grayscale-0">
                <CardContent className="p-5 text-center text-white">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${bill.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                    <bill.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{bill.title}</h3>
                  <p className="text-xs text-gray-300 mb-3">{bill.provider}</p>
                  <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white text-xs">ادفع الآن</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Indicators Section */}
      <section id="tourism" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1 rounded-full text-sm font-medium">مؤشرات الأداء</span>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">مساهمة قطاع السياحة في محافظة الجيزة</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">تعد محافظة الجيزة من أهم المقاصد السياحية في العالم</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {tourismStats.map((stat, index) => (
              <Card key={index} className={`${stat.color} border-0 overflow-hidden`}>
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}<span className="text-sm font-normal mr-1">{stat.unit}</span></div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader><CardTitle className="text-sm text-gray-700 dark:text-gray-300">عدد الزوار (بالمليون)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={visitorsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader><CardTitle className="text-sm text-gray-700 dark:text-gray-300">عائدات الفنادق (مليار $)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={hotelRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader><CardTitle className="text-sm text-gray-700 dark:text-gray-300">معدل الإشغال الفندقية %</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie data={occupancyData} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Public Complaints Section */}
      <section id="complaints" className="py-12 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Info */}
            <div className="lg:w-1/3 text-white text-center lg:text-right">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">خدمة المواطنين</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">بوابة شكاوى المواطنين</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                نحن هنا لخدمتكم. قدم شكواك أو اقتراحك وسيتم التعامل معها بأسرع وقت ممكن من خلال فريق متخصص.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>رد خلال 48 ساعة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Shield className="w-4 h-4" />
                  <span>سرية تامة</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-2/3 w-full">
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <form className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">الاسم الكامل</label>
                      <Input placeholder="أدخل اسمك الكامل" className="text-right" dir="rtl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">الرقم القومي</label>
                      <Input placeholder="أدخل الرقم القومي" className="text-right" dir="rtl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                      <Input placeholder="أدخل رقم الهاتف" className="text-right" dir="rtl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                      <Input placeholder="أدخل البريد الإلكتروني" type="email" className="text-right" dir="rtl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">نوع الشكوى</label>
                      <select className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md text-right bg-white" dir="rtl">
                        <option value="">اختر نوع الشكوى</option>
                        <option value="infrastructure">البنية التحتية</option>
                        <option value="services">الخدمات العامة</option>
                        <option value="environment">البيئة والنظافة</option>
                        <option value="traffic">المرور والطرق</option>
                        <option value="health">الصحة</option>
                        <option value="education">التعليم</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">المنطقة / الحي</label>
                      <select className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md text-right bg-white" dir="rtl">
                        <option value="">اختر المنطقة</option>
                        <option value="dokki">الدقي</option>
                        <option value="agouza">العجوزة</option>
                        <option value="mohandeseen">المهندسين</option>
                        <option value="haram">الهرم</option>
                        <option value="faisal">فيصل</option>
                        <option value="october">6 أكتوبر</option>
                        <option value="sheikh-zayed">الشيخ زايد</option>
                        <option value="badrashin">البدرشين</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">تفاصيل الشكوى</label>
                      <Textarea placeholder="اكتب تفاصيل شكواك أو اقتراحك هنا..." className="text-right min-h-[100px]" dir="rtl" />
                    </div>
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <p className="text-xs text-gray-500">بإرسال هذا النموذج، أنت توافق على سياسة الخصوصية</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg w-full sm:w-auto">
                        <Send className="w-5 h-5 ml-2" />
                        إرسال الشكوى
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="investment" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1 rounded-full text-sm font-medium">خريطة تفاعلية</span>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">استكشف محافظة الجيزة</h2>
          </div>

          {/* Map Type Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={() => setMapType("tourist")} 
              className={mapType === "tourist" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"}
            >
              المناطق السياحية
            </Button>
            <Button 
              onClick={() => setMapType("industrial")} 
              className={mapType === "industrial" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"}
            >
              المناطق الصناعية والاستثمارية
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={selectedLocation 
                  ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${Math.pow(2, 21 - selectedLocation.zoom)}!2d${selectedLocation.lng}!3d${selectedLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLocation!5e0!3m2!1sar!2seg`
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d442868.5466374068!2d30.7042!3d29.9673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584f7de4e70d63%3A0xab5b9d0e4e1c9d0!2sGiza%20Governorate!5e0!3m2!1sen!2seg!4v1705000000000!5m2!1sen!2seg"
                }
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="خريطة محافظة الجيزة"
                key={selectedLocation ? `${selectedLocation.lat}-${selectedLocation.lng}` : "default"}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  {mapType === "tourist" ? "المناطق السياحية" : "المناطق الصناعية والاستثمارية"}
                </h3>
                {selectedLocation && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setSelectedLocation(null)}
                    className="text-xs dark:border-gray-600 dark:text-gray-300"
                  >
                    عرض الكل
                  </Button>
                )}
              </div>
              {(mapType === "tourist" ? touristSpots : industrialZones).map((spot, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${
                    selectedLocation?.lat === spot.lat && selectedLocation?.lng === spot.lng
                      ? mapType === "tourist" 
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-lg" 
                        : "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg"
                      : "border-transparent bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedLocation({ lat: spot.lat, lng: spot.lng, zoom: spot.zoom })}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      selectedLocation?.lat === spot.lat && selectedLocation?.lng === spot.lng
                        ? mapType === "tourist" ? "bg-amber-500" : "bg-emerald-500"
                        : mapType === "tourist" ? "bg-amber-100 dark:bg-amber-900/50" : "bg-emerald-100 dark:bg-emerald-900/50"
                    }`}>
                      {mapType === "tourist" ? (
                        <MapPin className={`w-5 h-5 ${selectedLocation?.lat === spot.lat && selectedLocation?.lng === spot.lng ? "text-white" : "text-amber-600 dark:text-amber-400"}`} />
                      ) : (
                        <Factory className={`w-5 h-5 ${selectedLocation?.lat === spot.lat && selectedLocation?.lng === spot.lng ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{spot.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{mapType === "tourist" ? (spot as typeof touristSpots[0]).desc : (spot as typeof industrialZones[0]).area}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${mapType === "tourist" ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400" : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400"}`}>
                      {spot.type}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1 rounded-full text-sm font-medium">آخر الأخبار</span>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">أخبار المحافظة</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition group cursor-pointer dark:bg-gray-900">
                <div className="h-40 bg-gradient-to-br from-amber-400 to-amber-600" />
                <CardContent className="p-5">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.date}</p>
                  <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">{item.title}</h3>
                  <a href="#" className="text-amber-600 dark:text-amber-400 text-sm mt-3 inline-flex items-center gap-1">
                    اقرأ المزيد <ChevronLeft className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with QR Codes */}
      <section id="contact" className="py-16 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">تواصل معنا</span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-2">معلومات التواصل</h2>
            <p className="text-white/80">نحن هنا لخدمتك</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gray-900 text-white">
                <CardTitle className="flex items-center gap-2"><Phone className="w-5 h-5" /> أرقام التواصل</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">الخط الساخن</p>
                    <p className="text-2xl font-bold text-red-600">{contactInfo.hotline}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-700 mb-2">هاتف البوابة الإلكترونية</p>
                  <p className="text-gray-600">{contactInfo.portalPhones.join(" - ")}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-700 mb-2">خدمة المواطنين</p>
                  <p className="text-gray-600">{contactInfo.citizenService}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-700 mb-2">غرفة العمليات</p>
                  <p className="text-gray-600 text-sm">{contactInfo.operationsRoom.join(" - ")}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-700 mb-2">السويتش</p>
                  <p className="text-gray-600">{contactInfo.switchboard}</p>
                </div>
              </CardContent>
            </Card>

            {/* Email & Address */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gray-900 text-white">
                <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5" /> البريد والعنوان</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">البريد الإلكتروني</p>
                    <a href={`mailto:${contactInfo.portalEmail}`} className="text-blue-600 hover:underline">{contactInfo.portalEmail}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t pt-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">العنوان</p>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800 mb-3">بوابة الشكاوى الحكومية</p>
                  <a 
                    href={contactInfo.complaintsPortal} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    تقديم شكوى
                  </a>
                  {/* QR Code for Complaints Portal */}
                  <div className="mt-4 p-3 bg-white rounded-lg inline-block">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(contactInfo.complaintsPortal)}`}
                      alt="QR Code - بوابة الشكاوى"
                      className="w-24 h-24"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">بوابة الشكاوى</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media with QR Codes */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gray-900 text-white">
                <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> تابعنا</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center transition-transform hover:scale-110`}
                      >
                        <social.icon className="w-6 h-6 text-white" />
                      </a>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{social.name}</p>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                          زيارة الصفحة
                        </a>
                      </div>
                      <div className="bg-white p-1 rounded">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(social.url)}`}
                          alt={`QR Code - ${social.name}`}
                          className="w-14 h-14"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">محافظة الجيزة</h3>
                  <p className="text-xs text-gray-400">البوابة الإلكترونية</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">أرض الحضارة والتاريخ - موطن الأهرامات وأبو الهول</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-amber-500 transition">الرئيسية</a></li>
                <li><a href="#" className="hover:text-amber-500 transition">الخدمات الإلكترونية</a></li>
                <li><a href="#" className="hover:text-amber-500 transition">السياحة</a></li>
                <li><a href="#" className="hover:text-amber-500 transition">الاستثمار</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">خدمات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-amber-500 transition">دفع الفواتير</a></li>
                <li><a href="#" className="hover:text-amber-500 transition">التراخيص</a></li>
                <li><a href="#" className="hover:text-amber-500 transition">الشكاوى</a></li>
                <li><a href="#" className="hover:text-amber-500 transition">الاستعلامات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> الخط الساخن: {contactInfo.hotline}</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {contactInfo.portalEmail}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {contactInfo.address}</p>
              </div>
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>جميع الحقوق محفوظة - البوابة الإلكترونية لمحافظة الجيزة 2026</p>
          </div>
        </div>
      </footer>

      {/* Chat Bot */}
      <div className="fixed bottom-6 left-6 z-50">
        {isChatOpen && (
          <Card className="w-80 md:w-96 mb-4 shadow-2xl border-0 overflow-hidden animate-in slide-in-from-bottom-5">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">المساعد الذكي</h3>
                    <p className="text-xs opacity-80">متصل الآن</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="text-white hover:bg-white/20">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.from === "user" 
                        ? "bg-amber-500 text-white rounded-tr-none" 
                        : "bg-white text-gray-800 shadow rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-3 border-t bg-white">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    placeholder="اكتب رسالتك..."
                    className="flex-1 text-sm"
                  />
                  <Button onClick={handleChatSend} size="icon" className="bg-amber-500 hover:bg-amber-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
