
FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  #dependencies for cv2
  && apt-get install ffmpeg libsm6 libxext6 -y\
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system django \
    && adduser --system --ingroup django django

# make build dir for this project
RUN mkdir -p ./build
# Requirements are installed here to ensure they will be cached.
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=django:django ./docker/production/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint


COPY --chown=django:django ./docker/production/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start
COPY --chown=django:django . /app

USER django

WORKDIR /app

CMD ["/start"]
