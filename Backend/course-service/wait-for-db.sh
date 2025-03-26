#!/bin/sh

until nc -z -v -w30 postgres 5432; do
  echo "Esperando a PostgreSQL..."
  sleep 2
done
echo "PostgreSQL está listo!"