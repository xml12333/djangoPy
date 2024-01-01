run:
	cd app && npm run start
server:
	cd env\Scripts && activate.bat && cd ../../api && python manage.py runserver

