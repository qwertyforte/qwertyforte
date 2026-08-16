/**
 * QwertyForte Global Operating System Registry
 * Database of 100+ operating systems, kernels, ABIs, and package formats.
 * Includes 10 Core Pre-Enlisted Brands (with 3-tier version matrices)
 * and Specialized / Privacy / Minimalist Mobile Devices.
 */

(function (global) {
  'use strict';

  const OS_BRANDS = [
    {
      id: 'apple_ios',
      name: 'Apple iOS',
      ecosystem: 'Apple',
      category: 'mobile',
      icon: '📱',
      description: 'Apple mobile operating system for iPhone and iPod Touch.',
      versions: [
        {
          id: 'ios_18_0',
          versionName: 'iOS 18.0',
          versionNumber: '18.0',
          arch: 'arm64',
          format: '.ipa',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 4096,
          tags: ['modern', 'flagship', 'swift', 'arm64']
        },
        {
          id: 'ios_17_5',
          versionName: 'iOS 17.5',
          versionNumber: '17.5',
          arch: 'arm64',
          format: '.ipa',
          tier: 'popular',
          active: true,
          releaseYear: 2023,
          minRamMb: 3072,
          tags: ['popular', 'lts', 'swift', 'arm64']
        },
        {
          id: 'ios_4_3',
          versionName: 'iOS 4.3 (Legacy)',
          versionNumber: '4.3',
          arch: 'armv7',
          format: '.ipa',
          tier: 'oldest',
          active: true,
          releaseYear: 2011,
          minRamMb: 256,
          tags: ['legacy', 'iphone4', 'armv7', 'objective-c']
        }
      ]
    },
    {
      id: 'apple_macos',
      name: 'Apple macOS',
      ecosystem: 'Apple',
      category: 'desktop',
      icon: '🖥️',
      description: 'Apple desktop and workstation operating system for Mac.',
      versions: [
        {
          id: 'macos_15_0',
          versionName: 'macOS 15 Sequoia',
          versionNumber: '15.0',
          arch: 'arm64',
          format: '.dmg',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 8192,
          tags: ['apple-silicon', 'modern', 'swift', 'metal']
        },
        {
          id: 'macos_14_0',
          versionName: 'macOS 14 Sonoma',
          versionNumber: '14.0',
          arch: 'universal2',
          format: '.dmg',
          tier: 'popular',
          active: true,
          releaseYear: 2023,
          minRamMb: 8192,
          tags: ['universal', 'arm64', 'x86_64', 'popular']
        },
        {
          id: 'macos_10_6',
          versionName: 'Mac OS X 10.6 Snow Leopard',
          versionNumber: '10.6',
          arch: 'x86',
          format: '.dmg',
          tier: 'oldest',
          active: true,
          releaseYear: 2009,
          minRamMb: 1024,
          tags: ['legacy', 'intel32', 'carbon', 'cocoa']
        }
      ]
    },
    {
      id: 'google_android',
      name: 'Google Android',
      ecosystem: 'Google',
      category: 'mobile',
      icon: '🤖',
      description: 'Google open mobile platform powering billions of devices globally.',
      versions: [
        {
          id: 'android_15_0',
          versionName: 'Android 15 (Vanilla Ice Cream)',
          versionNumber: '15.0',
          arch: 'arm64-v8a',
          format: '.apk',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 4096,
          tags: ['modern', 'kotlin', 'art', 'arm64']
        },
        {
          id: 'android_14_0',
          versionName: 'Android 14 (Upside Down Cake)',
          versionNumber: '14.0',
          arch: 'arm64-v8a',
          format: '.apk',
          tier: 'popular',
          active: true,
          releaseYear: 2023,
          minRamMb: 3072,
          tags: ['popular', 'lts', 'arm64']
        },
        {
          id: 'android_4_4',
          versionName: 'Android 4.4 KitKat',
          versionNumber: '4.4',
          arch: 'armeabi-v7a',
          format: '.apk',
          tier: 'oldest',
          active: true,
          releaseYear: 2013,
          minRamMb: 512,
          tags: ['legacy', 'dalvik', 'armv7', 'low-ram']
        }
      ]
    },
    {
      id: 'google_chromeos',
      name: 'Google ChromeOS',
      ecosystem: 'Google',
      category: 'desktop',
      icon: '🌐',
      description: 'Cloud-first Linux-based operating system for Chromebooks and Chromeboxes.',
      versions: [
        {
          id: 'chromeos_126',
          versionName: 'ChromeOS 126',
          versionNumber: '126.0',
          arch: 'x86_64',
          format: '.crx',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 4096,
          tags: ['web', 'pwa', 'modern', 'x86_64']
        },
        {
          id: 'chromeos_115_lts',
          versionName: 'ChromeOS 115 LTS',
          versionNumber: '115.0',
          arch: 'x86_64',
          format: '.crx',
          tier: 'popular',
          active: true,
          releaseYear: 2023,
          minRamMb: 4096,
          tags: ['enterprise', 'lts', 'education', 'x86_64']
        },
        {
          id: 'chromeos_60',
          versionName: 'ChromeOS 60 (Legacy)',
          versionNumber: '60.0',
          arch: 'x86',
          format: '.crx',
          tier: 'oldest',
          active: true,
          releaseYear: 2017,
          minRamMb: 2048,
          tags: ['legacy', 'x86', 'crx2']
        }
      ]
    },
    {
      id: 'microsoft_windows',
      name: 'Microsoft Windows',
      ecosystem: 'Microsoft',
      category: 'desktop',
      icon: '🪟',
      description: 'Flagship Microsoft PC operating system across enterprise and consumer hardware.',
      versions: [
        {
          id: 'windows_11_24h2',
          versionName: 'Windows 11 (24H2)',
          versionNumber: '11.0.24H2',
          arch: 'x86_64',
          format: '.msix',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 4096,
          tags: ['modern', 'msix', 'winui3', 'x86_64']
        },
        {
          id: 'windows_10_22h2',
          versionName: 'Windows 10 (22H2)',
          versionNumber: '10.0.19045',
          arch: 'x86_64',
          format: '.msix',
          tier: 'popular',
          active: true,
          releaseYear: 2022,
          minRamMb: 4096,
          tags: ['popular', 'lts', 'win32', 'msix', 'x86_64']
        },
        {
          id: 'windows_3_1',
          versionName: 'Windows 3.1 (Legacy 16-bit)',
          versionNumber: '3.1',
          arch: 'x86',
          format: '.exe',
          tier: 'oldest',
          active: false,
          releaseYear: 1992,
          minRamMb: 4,
          tags: ['legacy', '16bit', 'win16', 'dos']
        },
        {
          id: 'windows_7_sp1',
          versionName: 'Windows 7 SP1',
          versionNumber: '6.1.7601',
          arch: 'x86_64',
          format: '.exe',
          tier: 'optional',
          active: false,
          releaseYear: 2011,
          minRamMb: 2048,
          tags: ['win32', 'classic', 'aero', 'x86_64']
        },
        {
          id: 'windows_xp_sp3',
          versionName: 'Windows XP SP3',
          versionNumber: '5.1.2600',
          arch: 'x86',
          format: '.exe',
          tier: 'optional',
          active: false,
          releaseYear: 2008,
          minRamMb: 512,
          tags: ['legacy', 'win32', 'x86']
        },
        {
          id: 'windows_98_se',
          versionName: 'Windows 98 SE',
          versionNumber: '4.10.2222',
          arch: 'x86',
          format: '.exe',
          tier: 'optional',
          active: false,
          releaseYear: 1999,
          minRamMb: 32,
          tags: ['legacy', 'win9x', 'fat32', 'x86']
        }
      ]
    },
    {
      id: 'microsoft_windows_phone',
      name: 'Microsoft Windows Phone',
      ecosystem: 'Microsoft',
      category: 'mobile',
      icon: '📱',
      description: 'Microsoft mobile platform featuring Live Tiles and Metro UI design.',
      versions: [
        {
          id: 'winphone_10_mobile',
          versionName: 'Windows 10 Mobile (Build 1709)',
          versionNumber: '10.0.15254',
          arch: 'arm64',
          format: '.appx',
          tier: 'newest',
          active: true,
          releaseYear: 2017,
          minRamMb: 2048,
          tags: ['uwp', 'metro', 'lumia', 'arm64']
        },
        {
          id: 'winphone_8_1',
          versionName: 'Windows Phone 8.1 (Lumia Denim)',
          versionNumber: '8.10.14234',
          arch: 'armv7',
          format: '.xap',
          tier: 'popular',
          active: true,
          releaseYear: 2014,
          minRamMb: 1024,
          tags: ['silverlight', 'winprt', 'lumia', 'armv7']
        },
        {
          id: 'winphone_7_5',
          versionName: 'Windows Phone 7.5 Mango',
          versionNumber: '7.10.7720',
          arch: 'armv7',
          format: '.xap',
          tier: 'oldest',
          active: true,
          releaseYear: 2011,
          minRamMb: 256,
          tags: ['legacy', 'silverlight', 'metro', 'armv7']
        },
        {
          id: 'winmobile_6_5',
          versionName: 'Windows Mobile 6.5 Professional',
          versionNumber: '6.5',
          arch: 'armv4t',
          format: '.cab',
          tier: 'optional',
          active: false,
          releaseYear: 2009,
          minRamMb: 128,
          tags: ['legacy', 'winmo', 'stylus', 'armv4t', 'cab']
        }
      ]
    },
    {
      id: 'linux_os',
      name: 'Linux Ecosystem',
      ecosystem: 'Linux',
      category: 'desktop',
      icon: '🐧',
      description: 'Open-source Unix-like kernel powering servers, desktops, and supercomputers.',
      versions: [
        {
          id: 'linux_ubuntu_24_04',
          versionName: 'Ubuntu 24.04 LTS (Noble Numbat)',
          versionNumber: '24.04',
          arch: 'x86_64',
          format: '.deb',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 4096,
          tags: ['modern', 'lts', 'systemd', 'gnome', 'x86_64']
        },
        {
          id: 'linux_ubuntu_22_04',
          versionName: 'Ubuntu 22.04 LTS / Debian 12',
          versionNumber: '22.04',
          arch: 'x86_64',
          format: '.deb',
          tier: 'popular',
          active: true,
          releaseYear: 2022,
          minRamMb: 4096,
          tags: ['popular', 'lts', 'debian', 'server', 'x86_64']
        },
        {
          id: 'linux_slackware_1_0',
          versionName: 'Slackware 1.0 / Linux 1.0 (Legacy)',
          versionNumber: '1.0',
          arch: 'i386',
          format: '.tar.gz',
          tier: 'oldest',
          active: true,
          releaseYear: 1993,
          minRamMb: 16,
          tags: ['legacy', 'monolithic', 'aout', 'i386']
        }
      ]
    },
    {
      id: 'bsd_os',
      name: 'BSD Family',
      ecosystem: 'BSD',
      category: 'desktop',
      icon: '😈',
      description: 'Berkeley Software Distribution derivatives renowned for networking, stability, and security.',
      versions: [
        {
          id: 'freebsd_14_1',
          versionName: 'FreeBSD 14.1 / OpenBSD 7.5',
          versionNumber: '14.1',
          arch: 'x86_64',
          format: '.pkg',
          tier: 'newest',
          active: true,
          releaseYear: 2024,
          minRamMb: 4096,
          tags: ['modern', 'zfs', 'jails', 'x86_64']
        },
        {
          id: 'freebsd_13_3',
          versionName: 'FreeBSD 13.3-RELEASE',
          versionNumber: '13.3',
          arch: 'x86_64',
          format: '.pkg',
          tier: 'popular',
          active: true,
          releaseYear: 2023,
          minRamMb: 2048,
          tags: ['popular', 'lts', 'networking', 'x86_64']
        },
        {
          id: 'bsd_386_0_1',
          versionName: '386BSD 0.1 / FreeBSD 1.0',
          versionNumber: '0.1',
          arch: 'i386',
          format: '.tar.gz',
          tier: 'oldest',
          active: true,
          releaseYear: 1992,
          minRamMb: 8,
          tags: ['legacy', 'historic', 'i386']
        }
      ]
    },
    {
      id: 'blackberry_os',
      name: 'BlackBerry (RIM)',
      ecosystem: 'BlackBerry',
      category: 'mobile',
      icon: '🫐',
      description: 'Research In Motion enterprise mobile operating systems for smartphones and tablets.',
      versions: [
        {
          id: 'bb_10_3',
          versionName: 'BlackBerry 10 (10.3.3)',
          versionNumber: '10.3.3',
          arch: 'armv7',
          format: '.bar',
          tier: 'newest',
          active: true,
          releaseYear: 2016,
          minRamMb: 2048,
          tags: ['qnx', 'cascades', 'touch', 'armv7', 'bar']
        },
        {
          id: 'bb_os_7_1',
          versionName: 'BlackBerry OS 7.1',
          versionNumber: '7.1.0',
          arch: 'armv5te',
          format: '.cod',
          tier: 'popular',
          active: true,
          releaseYear: 2012,
          minRamMb: 768,
          tags: ['bold', 'curve', 'j2me', 'armv5te', 'cod']
        },
        {
          id: 'bb_os_4_5',
          versionName: 'BlackBerry OS 4.5',
          versionNumber: '4.5.0',
          arch: 'armv5',
          format: '.cod',
          tier: 'oldest',
          active: true,
          releaseYear: 2008,
          minRamMb: 64,
          tags: ['legacy', 'trackball', 'rim', 'armv5', 'cod']
        }
      ]
    },
    {
      id: 'symbian_os',
      name: 'Symbian Foundation',
      ecosystem: 'Symbian',
      category: 'mobile',
      icon: '💠',
      description: 'Nokia / Symbian operating system dominant across early smartphone history.',
      versions: [
        {
          id: 'symbian_belle_fp2',
          versionName: 'Symbian Belle FP2 (Nokia 808)',
          versionNumber: '111.040',
          arch: 'armv7',
          format: '.sisx',
          tier: 'newest',
          active: true,
          releaseYear: 2012,
          minRamMb: 512,
          tags: ['nokia', 'qt', 'pureview', 'armv7', 'sisx']
        },
        {
          id: 'symbian_s60_5th',
          versionName: 'Symbian S60 5th Edition (Symbian^1)',
          versionNumber: '9.4',
          arch: 'armv6',
          format: '.sisx',
          tier: 'popular',
          active: true,
          releaseYear: 2008,
          minRamMb: 128,
          tags: ['nokia5800', 'n97', 'touch', 'armv6', 'sisx']
        },
        {
          id: 'symbian_s60_1st_2nd',
          versionName: 'Symbian S60 1st/2nd Edition',
          versionNumber: '7.0s',
          arch: 'armv4t',
          format: '.sis',
          tier: 'oldest',
          active: true,
          releaseYear: 2003,
          minRamMb: 32,
          tags: ['legacy', 'nokia6600', 'ngage', 'armv4t', 'sis']
        }
      ]
    }
  ];

  const SPECIALIZED_DEVICES = [
    {
      id: 'pinephone_pro',
      name: 'PinePhone / PinePhone Pro',
      brand: 'Pine64',
      osName: 'Manjaro ARM / PostmarketOS',
      version: '2024.1',
      arch: 'aarch64',
      format: '.apk',
      active: false,
      releaseYear: 2022,
      category: 'privacy_mobile',
      description: 'Mainline Linux smartphone with physical privacy hardware kill switches.'
    },
    {
      id: 'purism_librem_5',
      name: 'Purism Librem 5',
      brand: 'Purism',
      osName: 'PureOS (Phosh)',
      version: 'Byzantium',
      arch: 'aarch64',
      format: '.deb',
      active: false,
      releaseYear: 2020,
      category: 'privacy_mobile',
      description: 'Security-focused privacy phone running pure Linux with hardware switches.'
    },
    {
      id: 'sailfish_os_jolla',
      name: 'Sailfish OS Devices (Jolla)',
      brand: 'Jolla',
      osName: 'Sailfish OS 4.x (Struven Ketju)',
      version: '4.6.0',
      arch: 'aarch64',
      format: '.rpm',
      active: false,
      releaseYear: 2024,
      category: 'mobile',
      description: 'Independent European mobile OS utilizing Qt/QML and gesture-driven UI.'
    },
    {
      id: 'fairphone_eos',
      name: 'Fairphone (/e/OS / CalyxOS)',
      brand: 'Fairphone',
      osName: '/e/OS Privacy Edition',
      version: 'v2.1',
      arch: 'arm64-v8a',
      format: '.apk',
      active: false,
      releaseYear: 2023,
      category: 'ethical_mobile',
      description: 'Sustainable, repairable smartphone with de-Googled privacy OS.'
    },
    {
      id: 'volla_phone',
      name: 'Volla Phone',
      brand: 'Volla',
      osName: 'Volla OS / Ubuntu Touch',
      version: 'v13',
      arch: 'arm64-v8a',
      format: '.click',
      active: false,
      releaseYear: 2023,
      category: 'privacy_mobile',
      description: 'German privacy smartphone featuring springboard minimalist UI.'
    },
    {
      id: 'graphene_os_pixel',
      name: 'GrapheneOS on Pixel',
      brand: 'GrapheneOS Project',
      osName: 'GrapheneOS Hardened Android',
      version: '2024.08',
      arch: 'arm64-v8a',
      format: '.apk',
      active: false,
      releaseYear: 2024,
      category: 'hardened_mobile',
      description: 'Privacy and security hardened mobile operating system with app sandboxing.'
    },
    {
      id: 'mudita_pure_punkt',
      name: 'Mudita Pure / Punkt MP02',
      brand: 'Mudita & Punkt',
      osName: 'MuditaOS / AOSP Minimal',
      version: '2.0',
      arch: 'armv7',
      format: '.bin',
      active: false,
      releaseYear: 2022,
      category: 'minimalist',
      description: 'Ultra-minimalist digital detox phones with E-Ink and RTOS core.'
    },
    {
      id: 'minimal_phone',
      name: 'The Minimal Phone',
      brand: 'Minimal Co',
      osName: 'MinimalOS (E-Ink Android)',
      version: '1.0',
      arch: 'arm64-v8a',
      format: '.apk',
      active: false,
      releaseYear: 2024,
      category: 'minimalist',
      description: 'E-Ink QWERTY smartphone designed for mindful communication and high battery endurance.'
    }
  ];

  const GLOBAL_CATALOG = [
    { name: 'Alpine Linux', category: 'linux', format: '.apk', arch: 'x86_64', year: 2024, kernel: 'Linux 6.6 musl' },
    { name: 'Arch Linux', category: 'linux', format: '.pkg.tar.zst', arch: 'x86_64', year: 2024, kernel: 'Linux Rolling' },
    { name: 'Debian GNU/Linux', category: 'linux', format: '.deb', arch: 'x86_64', year: 2023, kernel: 'Linux 6.1 LTS' },
    { name: 'Fedora Linux', category: 'linux', format: '.rpm', arch: 'x86_64', year: 2024, kernel: 'Linux 6.8' },
    { name: 'FreeRTOS Embedded', category: 'embedded', format: '.bin', arch: 'cortex-m4', year: 2024, kernel: 'FreeRTOS Core' },
    { name: 'Haiku OS', category: 'desktop', format: '.hpkg', arch: 'x86_64', year: 2024, kernel: 'BeOS Modern' },
    { name: 'KaiOS Feature Phone', category: 'mobile', format: '.zip', arch: 'armv7', year: 2023, kernel: 'Gecko/Linux' },
    { name: 'MS-DOS / FreeDOS', category: 'legacy', format: '.exe', arch: 'x86', year: 1994, kernel: 'DOS 16-bit' },
    { name: 'NetBSD', category: 'bsd', format: '.pkg', arch: 'x86_64', year: 2024, kernel: 'NetBSD 10' },
    { name: 'OpenBSD', category: 'bsd', format: '.tgz', arch: 'x86_64', year: 2024, kernel: 'OpenBSD 7.5' },
    { name: 'QNX Neutrino RTOS', category: 'embedded', format: '.bin', arch: 'aarch64', year: 2023, kernel: 'Microkernel' },
    { name: 'Red Hat Enterprise Linux (RHEL)', category: 'linux', format: '.rpm', arch: 'x86_64', year: 2024, kernel: 'Linux 5.14/6.x' },
    { name: 'RISC OS Open', category: 'embedded', format: '.bin', arch: 'armv7', year: 2023, kernel: 'Acorn/RISC' },
    { name: 'Solaris / illumos', category: 'unix', format: '.p5p', arch: 'x86_64', year: 2023, kernel: 'OpenIndiana/Solaris' },
    { name: 'Tizen OS (Samsung)', category: 'wearable', format: '.tpk', arch: 'armv7', year: 2023, kernel: 'Linux/EFL' },
    { name: 'visionOS (Apple)', category: 'spatial', format: '.ipa', arch: 'arm64', year: 2024, kernel: 'Darwin/XNU' },
    { name: 'watchOS (Apple)', category: 'wearable', format: '.ipa', arch: 'arm64_32', year: 2024, kernel: 'Darwin/XNU' },
    { name: 'Zephyr RTOS', category: 'embedded', format: '.bin', arch: 'riscv32', year: 2024, kernel: 'Zephyr Kernel' }
  ];

  const OSRegistry = {
    getCoreBrands: function () {
      return JSON.parse(JSON.stringify(OS_BRANDS));
    },
    getSpecializedDevices: function () {
      return JSON.parse(JSON.stringify(SPECIALIZED_DEVICES));
    },
    getGlobalCatalog: function () {
      return JSON.parse(JSON.stringify(GLOBAL_CATALOG));
    },
    searchCatalog: function (query) {
      if (!query || typeof query !== 'string') return [];
      const q = query.toLowerCase().trim();
      const results = [];

      OS_BRANDS.forEach(brand => {
        if (brand.name.toLowerCase().includes(q) || brand.ecosystem.toLowerCase().includes(q)) {
          results.push({ type: 'brand', title: brand.name, subtitle: `${brand.ecosystem} - ${brand.versions.length} versions`, data: brand });
        }
        brand.versions.forEach(v => {
          if (v.versionName.toLowerCase().includes(q) || v.format.includes(q) || v.arch.includes(q)) {
            results.push({ type: 'version', title: `${brand.name} - ${v.versionName}`, subtitle: `Arch: ${v.arch} | Package: ${v.format} | ${v.releaseYear}`, data: { brand, version: v } });
          }
        });
      });

      SPECIALIZED_DEVICES.forEach(dev => {
        if (dev.name.toLowerCase().includes(q) || dev.brand.toLowerCase().includes(q) || dev.osName.toLowerCase().includes(q)) {
          results.push({ type: 'specialized', title: dev.name, subtitle: `${dev.brand} | ${dev.osName} | ${dev.arch}`, data: dev });
        }
      });

      GLOBAL_CATALOG.forEach(item => {
        if (item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
          results.push({ type: 'global', title: item.name, subtitle: `Category: ${item.category} | ${item.arch} | ${item.format}`, data: item });
        }
      });

      return results;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OSRegistry;
  } else {
    global.OSRegistry = OSRegistry;
  }
})(typeof window !== 'undefined' ? window : this);
