
FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # install daphne
  && apt-get install -y daphne \
  #install supervisor
  && apt-get install -y supervisor \ 
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system django \
    && adduser --system --ingroup django django

# Requirements are installed here to ensure they will be cached.
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./docker/production/supervisord.conf /etc/supervisor/

#copy start_app
COPY --chown=django:django ./docker/production/start_app /start_app
RUN sed -i 's/\r$//g' /start_app
RUN chmod +x /start_app
#copy start_daphne
COPY --chown=django:django ./docker/production/start_daphne /start_daphne
RUN sed -i 's/\r$//g' /start_daphne
RUN chmod +x /start_daphne
#copy start
COPY --chown=django:django ./docker/production/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY --chown=django:django . /app

#config for supervisor
COPY --chown=django:django  ./docker/production/gunicorn.conf /etc/supervisor/conf.d/gunicorn.conf
COPY --chown=django:django ./docker/production/daphne.conf /etc/supervisor/conf.d/daphne.conf

RUN mkdir /logs
RUN chown -R django:django /logs
RUN chown -R django:django /var/log/supervisor
RUN chown -R django:django /var/run

EXPOSE 8001

USER django

WORKDIR /app


CMD ["/start_app"]
