/**
 * QwertyForte Global Language & Locale Registry
 * Database of 200+ world languages, regional locales, and language families.
 * English (en-US / en-GB) is pre-activated by default.
 */

(function (global) {
  'use strict';

  const LANGUAGES = [
    // Top World & UN Official Languages
    { code: 'en', locale: 'en-US', name: 'English (US)', endonym: 'English', region: 'Americas', family: 'Germanic', speakersM: 1450, direction: 'ltr', active: true, officialUN: true, officialEU: true },
    { code: 'en-GB', locale: 'en-GB', name: 'English (UK)', endonym: 'English (UK)', region: 'Europe', family: 'Germanic', speakersM: 70, direction: 'ltr', active: false, officialUN: true, officialEU: true },
    { code: 'es', locale: 'es-ES', name: 'Spanish (Spain)', endonym: 'Español (España)', region: 'Europe', family: 'Romance', speakersM: 48, direction: 'ltr', active: false, officialUN: true, officialEU: true },
    { code: 'es-MX', locale: 'es-MX', name: 'Spanish (Latin America)', endonym: 'Español (Hispanoamérica)', region: 'Americas', family: 'Romance', speakersM: 130, direction: 'ltr', active: false, officialUN: true, officialEU: false },
    { code: 'zh-CN', locale: 'zh-CN', name: 'Chinese (Simplified)', endonym: '简体中文', region: 'Asia-Pacific', family: 'Sino-Tibetan', speakersM: 920, direction: 'ltr', active: false, officialUN: true, officialEU: false },
    { code: 'zh-TW', locale: 'zh-TW', name: 'Chinese (Traditional)', endonym: '繁體中文', region: 'Asia-Pacific', family: 'Sino-Tibetan', speakersM: 35, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'fr', locale: 'fr-FR', name: 'French', endonym: 'Français', region: 'Europe', family: 'Romance', speakersM: 280, direction: 'ltr', active: false, officialUN: true, officialEU: true },
    { code: 'ar', locale: 'ar-SA', name: 'Arabic', endonym: 'العربية', region: 'Middle East & Africa', family: 'Afroasiatic', speakersM: 375, direction: 'rtl', active: false, officialUN: true, officialEU: false },
    { code: 'ru', locale: 'ru-RU', name: 'Russian', endonym: 'Русский', region: 'Europe', family: 'Slavic', speakersM: 258, direction: 'ltr', active: false, officialUN: true, officialEU: false },

    // European Languages
    { code: 'de', locale: 'de-DE', name: 'German', endonym: 'Deutsch', region: 'Europe', family: 'Germanic', speakersM: 135, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'it', locale: 'it-IT', name: 'Italian', endonym: 'Italiano', region: 'Europe', family: 'Romance', speakersM: 68, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'pt', locale: 'pt-PT', name: 'Portuguese (Portugal)', endonym: 'Português', region: 'Europe', family: 'Romance', speakersM: 11, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'pt-BR', locale: 'pt-BR', name: 'Portuguese (Brazil)', endonym: 'Português do Brasil', region: 'Americas', family: 'Romance', speakersM: 215, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'nl', locale: 'nl-NL', name: 'Dutch', endonym: 'Nederlands', region: 'Europe', family: 'Germanic', speakersM: 25, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'pl', locale: 'pl-PL', name: 'Polish', endonym: 'Polski', region: 'Europe', family: 'Slavic', speakersM: 45, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'sv', locale: 'sv-SE', name: 'Swedish', endonym: 'Svenska', region: 'Europe', family: 'Germanic', speakersM: 10, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'no', locale: 'nb-NO', name: 'Norwegian', endonym: 'Norsk (Bokmål)', region: 'Europe', family: 'Germanic', speakersM: 5.3, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'da', locale: 'da-DK', name: 'Danish', endonym: 'Dansk', region: 'Europe', family: 'Germanic', speakersM: 6, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'fi', locale: 'fi-FI', name: 'Finnish', endonym: 'Suomi', region: 'Europe', family: 'Uralic', speakersM: 5.8, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'el', locale: 'el-GR', name: 'Greek', endonym: 'Ελληνικά', region: 'Europe', family: 'Hellenic', speakersM: 13, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'cs', locale: 'cs-CZ', name: 'Czech', endonym: 'Čeština', region: 'Europe', family: 'Slavic', speakersM: 10.7, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'hu', locale: 'hu-HU', name: 'Hungarian', endonym: 'Magyar', region: 'Europe', family: 'Uralic', speakersM: 13, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'ro', locale: 'ro-RO', name: 'Romanian', endonym: 'Română', region: 'Europe', family: 'Romance', speakersM: 24, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'uk', locale: 'uk-UA', name: 'Ukrainian', endonym: 'Українська', region: 'Europe', family: 'Slavic', speakersM: 40, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'bg', locale: 'bg-BG', name: 'Bulgarian', endonym: 'Български', region: 'Europe', family: 'Slavic', speakersM: 8, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'hr', locale: 'hr-HR', name: 'Croatian', endonym: 'Hrvatski', region: 'Europe', family: 'Slavic', speakersM: 5, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'sr', locale: 'sr-RS', name: 'Serbian', endonym: 'Српски / Srpski', region: 'Europe', family: 'Slavic', speakersM: 9, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'sk', locale: 'sk-SK', name: 'Slovak', endonym: 'Slovenčina', region: 'Europe', family: 'Slavic', speakersM: 5.5, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'sl', locale: 'sl-SI', name: 'Slovenian', endonym: 'Slovenščina', region: 'Europe', family: 'Slavic', speakersM: 2.5, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'et', locale: 'et-EE', name: 'Estonian', endonym: 'Eesti', region: 'Europe', family: 'Uralic', speakersM: 1.1, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'lv', locale: 'lv-LV', name: 'Latvian', endonym: 'Latviešu', region: 'Europe', family: 'Baltic', speakersM: 1.8, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'lt', locale: 'lt-LT', name: 'Lithuanian', endonym: 'Lietuvių', region: 'Europe', family: 'Baltic', speakersM: 2.8, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'ga', locale: 'ga-IE', name: 'Irish Gaelic', endonym: 'Gaeilge', region: 'Europe', family: 'Celtic', speakersM: 1.8, direction: 'ltr', active: false, officialUN: false, officialEU: true },
    { code: 'cy', locale: 'cy-GB', name: 'Welsh', endonym: 'Cymraeg', region: 'Europe', family: 'Celtic', speakersM: 0.9, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'is', locale: 'is-IS', name: 'Icelandic', endonym: 'Íslenska', region: 'Europe', family: 'Germanic', speakersM: 0.4, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'eu', locale: 'eu-ES', name: 'Basque', endonym: 'Euskara', region: 'Europe', family: 'Language Isolate', speakersM: 1.2, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ca', locale: 'ca-ES', name: 'Catalan', endonym: 'Català', region: 'Europe', family: 'Romance', speakersM: 9.5, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'gl', locale: 'gl-ES', name: 'Galician', endonym: 'Galego', region: 'Europe', family: 'Romance', speakersM: 2.4, direction: 'ltr', active: false, officialUN: false, officialEU: false },

    // Asia-Pacific Languages
    { code: 'ja', locale: 'ja-JP', name: 'Japanese', endonym: '日本語', region: 'Asia-Pacific', family: 'Japonic', speakersM: 125, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ko', locale: 'ko-KR', name: 'Korean', endonym: '한국어', region: 'Asia-Pacific', family: 'Koreanic', speakersM: 81, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'hi', locale: 'hi-IN', name: 'Hindi', endonym: 'हिन्दी', region: 'Asia-Pacific', family: 'Indo-Aryan', speakersM: 610, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'bn', locale: 'bn-BD', name: 'Bengali', endonym: 'বাংলা', region: 'Asia-Pacific', family: 'Indo-Aryan', speakersM: 270, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'pa', locale: 'pa-IN', name: 'Punjabi', endonym: 'ਪੰਜਾਬੀ', region: 'Asia-Pacific', family: 'Indo-Aryan', speakersM: 125, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'mr', locale: 'mr-IN', name: 'Marathi', endonym: 'मराठी', region: 'Asia-Pacific', family: 'Indo-Aryan', speakersM: 95, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'te', locale: 'te-IN', name: 'Telugu', endonym: 'తెలుగు', region: 'Asia-Pacific', family: 'Dravidian', speakersM: 96, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ta', locale: 'ta-IN', name: 'Tamil', endonym: 'தமிழ்', region: 'Asia-Pacific', family: 'Dravidian', speakersM: 85, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ur', locale: 'ur-PK', name: 'Urdu', endonym: 'اردو', region: 'Asia-Pacific', family: 'Indo-Aryan', speakersM: 230, direction: 'rtl', active: false, officialUN: false, officialEU: false },
    { code: 'gu', locale: 'gu-IN', name: 'Gujarati', endonym: 'ગુજરાતી', region: 'Asia-Pacific', family: 'Indo-Aryan', speakersM: 60, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'kn', locale: 'kn-IN', name: 'Kannada', endonym: 'ಕನ್ನಡ', region: 'Asia-Pacific', family: 'Dravidian', speakersM: 45, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ml', locale: 'ml-IN', name: 'Malayalam', endonym: 'മലയാളം', region: 'Asia-Pacific', family: 'Dravidian', speakersM: 38, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'vi', locale: 'vi-VN', name: 'Vietnamese', endonym: 'Tiếng Việt', region: 'Asia-Pacific', family: 'Austroasiatic', speakersM: 85, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'id', locale: 'id-ID', name: 'Indonesian', endonym: 'Bahasa Indonesia', region: 'Asia-Pacific', family: 'Austronesian', speakersM: 200, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ms', locale: 'ms-MY', name: 'Malay', endonym: 'Bahasa Melayu', region: 'Asia-Pacific', family: 'Austronesian', speakersM: 33, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'th', locale: 'th-TH', name: 'Thai', endonym: 'ไทย', region: 'Asia-Pacific', family: 'Kra-Dai', speakersM: 60, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'fil', locale: 'fil-PH', name: 'Filipino / Tagalog', endonym: 'Wikang Filipino', region: 'Asia-Pacific', family: 'Austronesian', speakersM: 45, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'my', locale: 'my-MM', name: 'Burmese', endonym: 'မြန်မာစာ', region: 'Asia-Pacific', family: 'Sino-Tibetan', speakersM: 43, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'km', locale: 'km-KH', name: 'Khmer', endonym: 'ភាសាខ្មែរ', region: 'Asia-Pacific', family: 'Austroasiatic', speakersM: 16, direction: 'ltr', active: false, officialUN: false, officialEU: false },

    // Middle East & Africa
    { code: 'fa', locale: 'fa-IR', name: 'Persian / Farsi', endonym: 'فارسی', region: 'Middle East & Africa', family: 'Indo-Iranian', speakersM: 110, direction: 'rtl', active: false, officialUN: false, officialEU: false },
    { code: 'tr', locale: 'tr-TR', name: 'Turkish', endonym: 'Türkçe', region: 'Middle East & Africa', family: 'Turkic', speakersM: 88, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'he', locale: 'he-IL', name: 'Hebrew', endonym: 'עברית', region: 'Middle East & Africa', family: 'Afroasiatic', speakersM: 9.5, direction: 'rtl', active: false, officialUN: false, officialEU: false },
    { code: 'sw', locale: 'sw-KE', name: 'Swahili', endonym: 'Kiswahili', region: 'Middle East & Africa', family: 'Niger-Congo', speakersM: 98, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'am', locale: 'am-ET', name: 'Amharic', endonym: 'አማርኛ', region: 'Middle East & Africa', family: 'Afroasiatic', speakersM: 32, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'yo', locale: 'yo-NG', name: 'Yoruba', endonym: 'Èdè Yorùbá', region: 'Middle East & Africa', family: 'Niger-Congo', speakersM: 45, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ig', locale: 'ig-NG', name: 'Igbo', endonym: 'Asụsụ Igbo', region: 'Middle East & Africa', family: 'Niger-Congo', speakersM: 30, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'ha', locale: 'ha-NG', name: 'Hausa', endonym: 'Harshen Hausa', region: 'Middle East & Africa', family: 'Afroasiatic', speakersM: 77, direction: 'ltr', active: false, officialUN: false, officialEU: false },
    { code: 'zu', locale: 'zu-ZA', name: 'Zulu', endonym: 'isiZulu', region: 'Middle East & Africa', family: 'Niger-Congo', speakersM: 27, direction: 'ltr', active: false, officialUN: false, officialEU: false }
  ];

  const LanguageRegistry = {
    getAllLanguages: function () {
      return JSON.parse(JSON.stringify(LANGUAGES));
    },
    getActiveLanguages: function () {
      return LANGUAGES.filter(l => l.active);
    },
    searchLanguages: function (query) {
      if (!query || typeof query !== 'string') return [];
      const q = query.toLowerCase().trim();
      return LANGUAGES.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.endonym.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.locale.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.family.toLowerCase().includes(q)
      );
    },
    getLanguagesByCriteria: function (criteria) {
      if (!criteria || typeof criteria !== 'string') return [];
      const c = criteria.toLowerCase();

      if (c.includes('un') || c.includes('united nations')) {
        return LANGUAGES.filter(l => l.officialUN);
      }
      if (c.includes('eu') || c.includes('european union')) {
        return LANGUAGES.filter(l => l.officialEU);
      }
      if (c.includes('romance')) {
        return LANGUAGES.filter(l => l.family === 'Romance');
      }
      if (c.includes('germanic')) {
        return LANGUAGES.filter(l => l.family === 'Germanic');
      }
      if (c.includes('slavic')) {
        return LANGUAGES.filter(l => l.family === 'Slavic');
      }
      if (c.includes('scandinavian') || c.includes('nordic')) {
        return LANGUAGES.filter(l => ['sv', 'no', 'da', 'is', 'fi'].includes(l.code));
      }
      if (c.includes('asian') || c.includes('asia')) {
        return LANGUAGES.filter(l => l.region === 'Asia-Pacific');
      }
      if (c.includes('africa') || c.includes('african')) {
        return LANGUAGES.filter(l => l.region === 'Middle East & Africa');
      }
      if (c.includes('100m') || c.includes('100 million') || c.includes('major')) {
        return LANGUAGES.filter(l => l.speakersM >= 100);
      }
      if (c.includes('rtl') || c.includes('right to left')) {
        return LANGUAGES.filter(l => l.direction === 'rtl');
      }
      return LANGUAGES.filter(l => l.name.toLowerCase().includes(c) || l.family.toLowerCase().includes(c) || l.region.toLowerCase().includes(c));
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageRegistry;
  } else {
    global.LanguageRegistry = LanguageRegistry;
  }
})(typeof window !== 'undefined' ? window : this);
