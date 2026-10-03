// ============================================================
// Türkçe sözlük — القاموس التركي
// Mirror of the Arabic dictionary (src/data/i18n/ar.ts).
// ============================================================
import { healthcareProgram } from "../content-config";

export const tr = {
  siteName: "Shababna Sanad",
  siteTagline: "Shababna Sanad Kalkınma ve Destek Derneği",

  nav: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    areas: "Çalışma Alanlarımız",
    impact: "Etkimiz",
    programs: "Programlarımız",
    news: "Haberler",
    contact: "İletişim",
    donate: "Bağış Yap",
  },

  hero: {
    headline: "Birlikte Etki Yaratıyoruz... Birlikte Daha İyi Bir Gelecek İnşa Ediyoruz",
    sub: "Shababna Sanad Kalkınma ve Destek Derneği, gençleri güçlendirmeye, toplulukları desteklemeye ve daha adil ve sürdürülebilir bir geleceğe doğru gerçek fırsatlar yaratmaya adanmıştır.",
    ctaPrimary: "Misyonumuzu Keşfedin",
    ctaSecondary: "Bize Katılın",
    badge: "Shababna Sanad Kalkınma ve Destek Derneği",
    brandSpan: "Shababna Sanad",
    stats: {
      beneficiaries: "Yararlanıcı",
      initiatives: "Girişim",
      volunteers: "Gönüllü",
      regions: "Ulaşılan Bölge",
    },
  },

  about: {
    title: "Biz Kimiz",
    eyebrow: "Dernek",
    paragraphs: [
      "Shababna Sanad Kalkınma ve Destek Derneği, insanı her değişimin merkezine koyan, gençleri toplumun enerjisi ve geleceğin yakıtı olarak gören insani ve kalkınma odaklı bir dernektir.",
      "Gençleri güçlendirmek ve topluluğu desteklemek için kalıcı etki yaratan kalkınma programları ve insani girişimler yürütüyor; gönüllülük, ortaklık ve iş birliği değerlerini güçlendiriyoruz.",
    ],
    cta: "Daha Fazla Bilgi Edinin",
    imageAlt: "Becerilerini geliştiren gençler",
    floatingStat: "Aktif Gönüllüler",
    values: [
      { title: "Dürüstlük", desc: "Yaptığımız her işte şeffaflığa bağlıyız." },
      { title: "Sürdürülebilirlik", desc: "Etkisi her girişimin ötesinde süren çalışmalar." },
      { title: "Ortaklık", desc: "Toplumla iş birliği köprüleri kuruyoruz." },
      { title: "Güçlendirme", desc: "İnsanların potansiyeline ve fırsatlarına inanıyoruz." },
    ],
  },

  mission: {
    title: "Misyonumuz",
    text: "Gençleri güçlendirerek, en çok ihtiyaç duyan kesimleri destekleyerek ve kalıcı etki yaratan kalkınma ve insani girişimler hayata geçirerek daha güçlü ve uyumlu bir toplum için çalışıyoruz.",
  },

  vision: {
    title: "Vizyonumuz",
    text: "Üyelerini ayağa kaldırabilen bir toplum; bilgiye, fırsatlara ve değişim yaratma gücüne sahip gençler.",
  },

  areas: {
    title: "Çalışma Alanlarımız",
    eyebrow: "Çalışma Eksenleri",
    items: [
      {
        key: "youth",
        title: "Gençlik Desteği",
        desc: "Geleceğin zorluklarıyla yüzleşmeleri için gençleri güçlendirmek, yeteneklerini ve becerilerini geliştirmek.",
        icon: "Users",
      },
      {
        key: "education",
        title: "Eğitim",
        desc: "Eğitime erişimi desteklemek ve herkes için sürdürülebilir öğrenme fırsatları oluşturmak.",
        icon: "GraduationCap",
      },
      {
        key: "community",
        title: "Toplumsal Kalkınma",
        desc: "Yerel toplulukların yaşamlarını iyileştiren girişimler uygulamak.",
        icon: "Building2",
      },
      {
        key: "humanitarian",
        title: "İnsani Destek",
        desc: "İnsani ihtiyaçlara yanıt vermek ve en kırılgan kesimlere destek olmak.",
        icon: "HeartHandshake",
      },
      {
        key: "economic",
        title: "Ekonomik Güçlendirme",
        desc: "Bireylerin daha iyi bir gelecek kurmasına yardımcı olacak fırsatlar yaratmak ve beceriler geliştirmek.",
        icon: "TrendingUp",
      },
      {
        key: "volunteering",
        title: "Gönüllülük ve Katılım",
        desc: "Gençleri ve gönüllüleri toplumsal etki yaratmaya dahil etmek.",
        icon: "HandHeart",
      },
    ],
  },

  programs: {
    title: "Programlarımız ve Girişimlerimiz",
    eyebrow: "Programlarımız",
    items: [
      {
        image: "/images/program1.jpg",
        title: "Gençlik Güçlendirme Programı",
        desc: "Gençlere geleceklerini inşa etmeleri için bilgi, beceri ve fırsatlar sunuyoruz.",
        metric: "+500 Yararlanıcı",
        cta: "Devamını Oku",
      },
      {
        image: "/images/program2.jpg",
        title: "Herkese Eğitim Girişimi",
        desc: "Eğitim fırsatlarını destekliyor ve ihtiyacı olanlara öğrenme araçları sağlıyoruz.",
        metric: "+300 Öğrenci",
        cta: "Devamını Oku",
      },
      {
        image: "/images/program3.jpg",
        title: "Girişimcilik Programı",
        desc: "Gençlere fikirlerini gerçek ve etkili projelere dönüştürmelerinde eşlik ediyoruz.",
        metric: "+120 Proje",
        cta: "Devamını Oku",
      },
      healthcareProgram.tr,
    ],
  },

  impact: {
    title: "Rakamlarla Etkimiz",
    eyebrow: "Etki",
    items: [
      { value: 1000, suffix: "+", label: "Yararlanıcı" },
      { value: 25, suffix: "+", label: "Girişim" },
      { value: 100, suffix: "+", label: "Gönüllü" },
      { value: 10, suffix: "+", label: "Ortaklık" },
    ],
  },

  partners: {
    title: "İş Ortaklarımız",
    eyebrow: "Etkide Ortaklarımız",
    note: "İş ortaklarının resmi duyurusu yakında yapılacaktır. Ortaklık fırsatları hakkında bilgi almak için bizimle iletişime geçin.",
    items: ["Partner A", "Partner B", "Partner C", "Partner D", "Partner E", "Partner F"],
  },

  cta: {
    title: "Etkinin Bir Parçası Olun",
    text: "Desteğiniz, zamanınız ve uzmanlığınız bir insanın hayatında gerçek bir fark yaratabilir.",
    donate: "Bağış Yap",
    volunteer: "Gönüllü Ol",
    contact: "Bize Ulaşın",
  },

  contact: {
    title: "Bize Ulaşın",
    text: "Sizden haber almak isteriz. Ekibimiz iş günleri içinde yanıt verir.",
    follow: "Bizi Takip Edin",
    email: { label: "E-posta", value: "info@shababnasand.org" },
    phone: { label: "Telefon", value: "+000 000 000 000" },
    address: { label: "Adres", value: "Merkez — yakında duyurulacak" },
    form: {
      name: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon",
      subject: "Konu",
      message: "Mesaj",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      send: "Mesaj Gönder",
      success: "Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.",
      error: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
      validationSummary: "Lütfen gönderimden önce işaretli alanları düzeltin.",
      errors: {
        nameRequired: "Ad Soyad alanı zorunludur",
        nameInvalid: "Lütfen 2 ile 100 harf arasında, yalnızca harf ve boşluklardan oluşan geçerli bir ad girin.",
        email: "Lütfen geçerli bir e-posta adresi girin",
        phone: "Lütfen geçerli bir telefon numarası girin",
        subjectRequired: "Konu alanı zorunludur",
        subjectInvalid: "Konu 150 karakter veya daha kısa olmalıdır.",
        message: "Mesaj 10 ile 3000 karakter arasında olmalıdır",
      },
    },
  },

  footer: {
    description: "Shababna Sanad Kalkınma ve Destek Derneği — gençleri güçlendirmeye, toplulukları desteklemeye ve sürdürülebilir etki yaratmaya adanmış insani ve kalkınma odaklı bir dernektir.",
    navTitle: "Hızlı Bağlantılar",
    supportTitle: "Bizi Destekleyin",
    support: {
      donate: "Bağış",
      volunteer: "Gönüllü Ol",
      partner: "Bize Ortak Olun",
    },
    legal: {
      privacy: "Gizlilik Politikası",
      terms: "Şartlar ve Koşullar",
    },
    copyright: "© 2026 Shababna Sanad Kalkınma ve Destek Derneği. Tüm hakları saklıdır.",
  },

  seo: {
    title: "Shababna Sanad Kalkınma ve Destek Derneği — İnsani Yardım ve Kalkınma Derneği",
    description: "Shababna Sanad Kalkınma ve Destek Derneği, gençleri güçlendirir, toplulukları destekler ve daha adil, sürdürülebilir bir gelecek için gerçek fırsatlar yaratır.",
    socialTitle: "Shababna Sanad Kalkınma ve Destek Derneği",
    socialDescription: "Gençleri güçlendirmeye, toplulukları desteklemeye ve kalıcı etki yaratmaya adanmış insani yardım ve kalkınma derneği.",
    keywords: "Shababna Sanad, dernek, gençlik, güçlendirme, kalkınma, insani yardım, toplum, gönüllülük",
    locale: "tr_TR",
  },

  a11y: {
    skipToContent: "İçeriğe atla",
    logo: "Ana Sayfa",
    mainNav: "Ana gezinme",
    mobileNav: "Mobil gezinme",
    languageGroup: "Dil",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    closeDialog: "Pencereyi kapat",
    viewDetails: "Detayları görüntüle",
    backToProgram: "Programa dön",
    downloadFile: "Dosyayı indir",
    fileUnavailable: "Bu projenin detayları yakında yayınlanacaktır.",
    programServices: "Hizmetler ve başarılar",
    previousProgram: "Önceki program",
    nextProgram: "Sonraki program",
    goToProgram: "Programa git",
    programPagination: "Program sayfaları",
    swipePrograms: "Programlar arasında gezinmek için kaydırın",
    heroLabel: "Ana içerik",
    scrollToContent: "İçeriğe kaydır",
  },
};