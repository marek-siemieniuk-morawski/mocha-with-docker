#!/bin/bash
# Only for Docker usage

# Depending whether EXPRESSION variable is given or not 
if ! [ "$EXPRESSION" ]
  then
    ENV="$ENV" npm run test:"${DOMAIN}"
  else
    ENV="$ENV" npm run test:"${DOMAIN}" -- -g "$EXPRESSION"
fi
