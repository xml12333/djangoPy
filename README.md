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
- supervisord.conf - supervisor config
- start - bash script for running supervisor witch start daphne and gunicorn according to config file above.
- nginx_exampl.conf - example of line needed to fix in caprover app nginx config for correct redirection, alson in caprover app need create port maping 8010-8010
- dockerfile - creation docker container