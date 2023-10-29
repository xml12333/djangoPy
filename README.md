
# SAAS Face Recognigion project Django + React with Semantic UI

Simple model with stripe plan 0.05$ per request

## Backend development workflow

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

### react-scripts > 3.3.x version need for support Optional Chaining eq. object?.property support.

Enable legacy OpenSSL provider. Its need for react-scripts 3.x version update from 1.x


On Unix-like (Linux, macOS, Git bash, etc.):
```json
export NODE_OPTIONS=--openssl-legacy-provider
```

On Windows command prompt:
```json
set NODE_OPTIONS=--openssl-legacy-provider
```

On PowerShell:
```json
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```

## Deployment workflow
1. Change the manage.py to use the production settings
2. Change the constants.js file inside src to have DEBUG set to false
3. Push to the production environment
4. Run python manage.py migrate
5. Run npm run build
6. Run python manage.py collectstatic




