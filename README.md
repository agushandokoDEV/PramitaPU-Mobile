# Mobile-Parkir

running DEBUG (CMD)
- react-native run-android (android)
- react-native run-ios (ios)

Release (Android)
- masuk ke direktory android 
- gradlew assembleRelease (APK)
- gradlew bundleRelease (AAB)
- lokasi APK (NamaProject/android/app/build/outputs/apk/release/app-release.apk)

Syarat release APK
https://reactnative.dev/docs/signed-apk-android

Struktur Folder Project 
- android (untuk seting kebutuhan android)
- ios (untuk seting kebutuhan ios)
- node_modules (package)
- src
    - assets (penyimpanan asset image)
    - components (lokasi komponent yang bisa di gunakan di berbagai halaman / reusable)
    - config (semacam env / global variable)
    - pages (screen /  halaman pada aplikasi)
    - Router.js (untuk mengatur navigaasi / perpindahan halaman)
    - store (management state by REDUX)
