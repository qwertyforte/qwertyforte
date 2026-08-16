/**
 * QwertyForte Internationalization (i18n) & Global Reserved Help Keywords Registry
 * Enforces protected multilingual help command aliases across all world languages.
 */

(function (global) {
  'use strict';

  // Global Protected / Reserved Help Keywords across world languages.
  // These words are strictly reserved and guaranteed to always render the Help subsystem.
  const RESERVED_HELP_KEYWORDS = {
    'help': 'English',
    'ayuda': 'Spanish',
    'socorro': 'Spanish / Portuguese',
    'auxilio': 'Spanish / Portuguese',
    'aide': 'French',
    'secours': 'French',
    'hilfe': 'German',
    'aiuto': 'Italian',
    'ajuda': 'Portuguese',
    'pomoc': 'Polish / Czech / Slovak / Croatian / Serbian / Bosnian',
    'hjelp': 'Norwegian',
    'hjalp': 'Swedish',
    'hjälp': 'Swedish',
    'apua': 'Finnish',
    'hjælp': 'Danish',
    'yardim': 'Turkish',
    'yardım': 'Turkish',
    'segitseg': 'Hungarian',
    'segítség': 'Hungarian',
    'tasukete': 'Japanese',
    'herupu': 'Japanese',
    'bangzhu': 'Chinese (Mandarin)',
    'bangzhuu': 'Chinese (Pinyin)',
    'doyoume': 'Korean',
    'dowajuseyo': 'Korean',
    'madad': 'Hindi / Urdu',
    'sahayata': 'Hindi',
    'musaaeda': 'Arabic',
    'musaeda': 'Arabic',
    'ezer': 'Hebrew',
    'ezrah': 'Hebrew',
    'vspomozhenie': 'Russian (Arch)',
    'pomoshch': 'Russian',
    'dopomoha': 'Ukrainian',
    'tolk': 'Dutch',
    'hulp': 'Dutch',
    'kytkemy': 'Amharic',
    'msaada': 'Swahili',
    'trợgiúp': 'Vietnamese',
    'trogiup': 'Vietnamese',
    'tulong': 'Tagalog / Filipino'
  };

  const TRANSLATIONS = {
    en: {
      appTitle: 'QwertyForte',
      tagline: 'Universal Cross-Platform Build Matrix & Developer Scaffolding',
      tabOSTargets: 'OS Targets',
      tabLanguages: 'Supported Languages',
      tabPackager: 'Build & Packaging',
      tabTickets: 'Ticket History',
      tabDocs: 'Documentation',
      searchPlaceholder: 'Search 100+ OSes, languages, or type agent slash commands (/libre, /help, /checkmark, /checkoff)...',
      activeTargets: 'Active Target Packages',
      activeLanguages: 'Supported Languages',
      totalBrands: 'Ecosystem Brands',
      estFootprint: 'Total Build Output',
      appName: 'Application Name',
      versionName: 'Version Name',
      versionNumber: 'Version Number',
      generateAll: 'Generate All Packages',
      exportConfig: 'Export Profile (JSON)',
      importConfig: 'Import Profile',
      ticketTimeline: 'State Ticket History',
      genesisTicket: 'Genesis Baseline Matrix',
      sourceAttribution: 'Source Attribution',
      exactDelta: 'Exact State Delta',
      rollbackBtn: 'Rollback to this state',
      helpHeader: 'QwertyForte Agent & Command Help',
      allLanguagesFilter: 'All Regions',
      unOfficialFilter: 'UN Official (6)',
      romanceFilter: 'Romance Family',
      germanicFilter: 'Germanic Family',
      clearFilter: 'Reset Filters'
    },
    es: {
      appTitle: 'QwertyForte',
      tagline: 'Matriz de Compilación Universal y Scaffolding para Desarrolladores',
      tabOSTargets: 'Objetivos de SO',
      tabLanguages: 'Idiomas Soportados',
      tabPackager: 'Compilación y Paquetes',
      tabTickets: 'Historial de Tickets',
      tabDocs: 'Documentación',
      searchPlaceholder: 'Buscar más de 100 SOs, idiomas o escribir comandos (/libre, /ayuda, /checkmark)...',
      activeTargets: 'Paquetes Objetivo Activos',
      activeLanguages: 'Idiomas Soportados',
      totalBrands: 'Ecosistemas y Marcas',
      estFootprint: 'Tamaño Estimado',
      appName: 'Nombre de la Aplicación',
      versionName: 'Nombre de Versión',
      versionNumber: 'Número de Versión',
      generateAll: 'Generar Todos los Paquetes',
      exportConfig: 'Exportar Perfil (JSON)',
      importConfig: 'Importar Perfil',
      ticketTimeline: 'Historial de Estados y Tickets',
      genesisTicket: 'Matriz Base Génesis',
      sourceAttribution: 'Atribución de Origen',
      exactDelta: 'Delta Exacto de Cambio',
      rollbackBtn: 'Restaurar a este estado',
      helpHeader: 'Ayuda y Comandos de QwertyForte',
      allLanguagesFilter: 'Todas las Regiones',
      unOfficialFilter: 'Oficiales ONU (6)',
      romanceFilter: 'Familia Romance',
      germanicFilter: 'Familia Germánica',
      clearFilter: 'Reiniciar Filtros'
    },
    fr: {
      appTitle: 'QwertyForte',
      tagline: 'Matrice de Compilation Universelle et Scaffolding',
      tabOSTargets: 'Systèmes Cibles',
      tabLanguages: 'Langues Supportées',
      tabPackager: 'Génération de Paquets',
      tabTickets: 'Historique des Tickets',
      tabDocs: 'Documentation',
      searchPlaceholder: 'Rechercher 100+ OS, langues ou taper des commandes (/libre, /aide, /checkmark)...',
      activeTargets: 'Paquets Actifs',
      activeLanguages: 'Langues Supportées',
      totalBrands: 'Écosystèmes',
      generateAll: 'Générer Tous les Paquets',
      exportConfig: 'Exporter Profil',
      importConfig: 'Importer Profil',
      helpHeader: 'Aide et Commandes QwertyForte'
    },
    de: {
      appTitle: 'QwertyForte',
      tagline: 'Universelle Build-Matrix & Entwickler-Scaffolding',
      tabOSTargets: 'Ziel-Betriebssysteme',
      tabLanguages: 'Unterstützte Sprachen',
      tabPackager: 'Paketerstellung',
      tabTickets: 'Ticket-Verlauf',
      tabDocs: 'Dokumentation',
      searchPlaceholder: '100+ Betriebssysteme oder Sprachen durchsuchen (/libre, /hilfe, /checkmark)...',
      activeTargets: 'Aktive Pakete',
      activeLanguages: 'Unterstützte Sprachen',
      generateAll: 'Alle Pakete Generieren',
      exportConfig: 'Profil Exportieren',
      importConfig: 'Profil Importieren',
      helpHeader: 'QwertyForte Hilfe & Befehle'
    },
    ja: {
      appTitle: 'QwertyForte',
      tagline: 'ユニバーサル・ビルドマトリックス＆開発スキャフォールディング',
      tabOSTargets: '対象OS',
      tabLanguages: '対応言語',
      tabPackager: 'パッケージビルド',
      tabTickets: 'チケット履歴',
      tabDocs: 'ドキュメント',
      searchPlaceholder: '100以上のOS、言語を検索、またはコマンド入力 (/libre, /help, /tasukete)...',
      activeTargets: '有効なパッケージ',
      activeLanguages: '対応言語数',
      generateAll: '全パッケージを生成',
      exportConfig: '設定をエクスポート',
      importConfig: '設定をインポート',
      helpHeader: 'QwertyForte ヘルプ＆コマンド'
    },
    zh: {
      appTitle: 'QwertyForte',
      tagline: '通用跨平台构建矩阵与开发者脚手架',
      tabOSTargets: '目标操作系统',
      tabLanguages: '支持的语言',
      tabPackager: '打包与构建',
      tabTickets: '票据历史',
      tabDocs: '文档',
      searchPlaceholder: '搜索100+系统、语言或输入指令 (/libre, /freeform, /help, /bangzhu)...',
      activeTargets: '激活的目标安装包',
      activeLanguages: '支持的语言数',
      generateAll: '生成全部安装包',
      exportConfig: '导出配置文件',
      importConfig: '导入配置文件',
      helpHeader: 'QwertyForte 帮助与指令'
    }
  };

  let currentLanguage = 'en';

  const I18n = {
    getCurrentLanguage: function () {
      return currentLanguage;
    },
    setLanguage: function (langCode) {
      if (TRANSLATIONS[langCode]) {
        currentLanguage = langCode;
        return true;
      }
      return false;
    },
    t: function (key) {
      const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
      return dict[key] || TRANSLATIONS.en[key] || key;
    },
    isReservedHelpKeyword: function (word) {
      if (!word || typeof word !== 'string') return false;
      const clean = word.toLowerCase().replace(/^\//, '').trim();
      return Boolean(RESERVED_HELP_KEYWORDS[clean]);
    },
    getReservedHelpKeywordsList: function () {
      return Object.assign({}, RESERVED_HELP_KEYWORDS);
    },
    getLocalizedHelpAlias: function (langCode) {
      const code = langCode || currentLanguage;
      switch (code) {
        case 'es': return 'ayuda';
        case 'fr': return 'aide';
        case 'de': return 'hilfe';
        case 'ja': return 'tasukete';
        case 'zh': return 'bangzhu';
        case 'pt': return 'ajuda';
        case 'it': return 'aiuto';
        case 'ru': return 'pomoshch';
        case 'ar': return 'musaaeda';
        default: return 'help';
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
  } else {
    global.I18n = I18n;
  }
})(typeof window !== 'undefined' ? window : this);
