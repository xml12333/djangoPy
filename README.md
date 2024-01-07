# Backend: Django + DRFM + SimpleJWT + Channels 
# Frontend: ReactNative + Zustand + EncryptedStorage + ImagePicker

### Start front end (app folder)
```
make run
```
Then press 'a' - for run android emulator from android studio.

### Start backend (api folder)
```
make server
```

### For deployment on Caprover

in docker\production:
- daphne.conf - supervisor config for daphne service
- gunicorn.conf - supervisor config for gunicorn service
- start_app - bash script from gunicorn.conf
- supervisord.conf - supervisor config
- start - bash script for running supervisor witch start daphne and gunicorn according to config file above.
- nginx_exampl.conf - example of line needed to fix in caprover app nginx config for correct redirection, alson in caprover app need create port maping 8010-8010
- dockerfile - creation docker container


### For deployment apk
- creating key with keytool. keytool located in jdk\bin
```
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
- copy keystore to project
```
mv my-release-key.keystore /android/app
```
- change android\app\build.gradle file
```
signingConfigs {
       ...
        release {
            storeFile file('realtime-chat.keystore')
            storePassword System.console().readLine("\nKeystore password:")
            keyAlias System.console().readLine("\nAlias: ")
            keyPassword System.console().readLine("\nAlias password: ")
        }
        ...
    }
    

    buildTypes {
        ....
        release {
            ...
            signingConfig signingConfigs.release
            signingConfig signingConfigs.debug
            ...
        }
    }
```
- buld release from app folder
```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android

./gradlew assembleRelease
```
