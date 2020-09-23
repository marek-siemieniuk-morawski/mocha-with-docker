#!/bin/bash
# Only for Docker usage

# Depending whether GREP variable is given or not 
if ! [ "$GREP" ]
  then
    ENV="$ENV" npm run test:"${DOMAIN}"
  else
    ENV="$ENV" npm run test:"${DOMAIN}" -- -g "$GREP"
fi
