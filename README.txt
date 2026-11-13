GRAND PRIX MANAGER 0.10.4 — SEASON-AWARE DRIVER PORTRAITS

GRAND PRIX MANAGER — MANAGEMENT OVERHAUL PRE-RELEASE

A Windows desktop Formula racing management game built with Electron.

WHAT CHANGED IN 0.10.0
- Removed the 3D garage, 3D chassis previews, livery studio and chassis selector from the player-facing game.
- Added a Team Principal Management Centre for driver contracts, technical development, sponsors, staff, standings and race archives.
- Added a local original electronic house soundtrack. Press the music control in the main menu to play or pause it.
- Added seven upgradeable modules for a constructor's own works power unit. Customer teams cannot modify another manufacturer's engine internals.
- Sponsor agreements now pay recurring income after each completed race, with extra payments for strong results and podiums.
- Driver profiles attempt to load only reusable-licensed portraits from Wikimedia Commons and display attribution; unavailable portraits use initials instead.
- Existing Team Principal and Driver Career save formats are preserved and extended lazily.

CURRENT LIMITATIONS — THIS IS NOT A STEAM RELEASE
- The playable season grids currently focus on 2022–2026. The historical driver market is still a curated subset; the full 1950–2026 driver and constructor database and complete team ownership/name lineage system are not implemented yet.
- 2027 is a future season; confirmed entry lists and results must be added as they become available, not invented.
- Driver portrait coverage is not guaranteed for every driver and requires an internet connection to search Commons.
- No Steamworks integration, store page assets, release certification or full legal review has been completed. Do not advertise this build as the completed Steam version.

WINDOWS INSTALLER
- Install Node.js 20 LTS or newer on Windows.
- Run BUILD_WINDOWS.bat. It installs Electron/build dependencies, runs automated QA, downloads the required circuit SVG assets and creates the NSIS installer in dist\.
- Install the generated setup.exe and launch Grand Prix Manager from its desktop shortcut.

TECHNICAL
- Electron desktop window; no Python, localhost server or manually opened browser is required at runtime.
- Career saves use local app storage. Cloud-folder synchronization remains available through the existing save controls.
- Circuit SVG layouts are sourced from the CC BY 4.0 f1-circuits-svg collection; see CIRCUIT_MAPS_ATTRIBUTION.txt.
- The soundtrack is original audio generated for this project, not a commercial song.
- See BUILD_0_10_0_NOTES.txt and BUILD_0_10_0_QA_REPORT.txt for implemented features and test limitations.


0.10.3 UPDATE: Completed seasons are automatically archived after the final race, full driver and constructor tables are retained in the career chronicle, and duplicate Hall of Fame title counting is prevented. See BUILD_0_10_3_NOTES.txt for limitations and verification details.


0.10.4 UPDATE: Driver photo lookups are now season-aware for 2022–2026, shared by the Driver Market and broadcast grid/podium, and use a strict reusable-licence allowlist with photographer, licence and source attribution. Internet access is required to retrieve Commons photos; initials remain as a fallback.

HISTORICAL DATABASE (0.10.11.0)
Historical F1 seasons 1950–2015 are loaded from F1DB on demand when a season is selected. An internet connection is required the first time each season is loaded; loaded season data is cached locally. F1DB attribution and license details are in F1DB_ATTRIBUTION.txt. The 2016–2026 grids remain bundled, and the 2027 FIA calendar is included with the Haas second seat shown as TBC.

IPHONE PWA
The project includes an Apple touch icon, PNG install icons, safe-area layout and a service worker. To install on iPhone, first publish the static project on an HTTPS website, open that website in Safari, tap Share, and choose Add to Home Screen. A ZIP file by itself cannot install a PWA on iOS, and this project is not a signed native IPA.
