#!/usr/bin/env bash

# See also https://stackoverflow.com/questions/2264428/how-to-convert-a-string-to-lower-case-in-bash - the bash4 version does not work on lots of macs

echo ""
echo "Build for GIGS_STACK_NAME=${GIGS_STACK_NAME}"

gigs_stack_name_lower=$(echo "$GIGS_STACK_NAME" | tr '[:upper:]' '[:lower:]')
sub_domain=${gigs_stack_name_lower}

export VITE_SERVER_ADDRESS=https://${sub_domain}.infinityworks.academy/api
export VITE_FLYERS_ADDRESS=https://flyers-${sub_domain}.infinityworks.academy
export VITE_STACK_NAME=${GIGS_STACK_NAME}

echo "...VITE_SERVER_ADDRESS=${VITE_SERVER_ADDRESS}"
echo "...VITE_FLYERS_ADDRESS=${VITE_FLYERS_ADDRESS}"
echo "...VITE_STACK_NAME=${VITE_STACK_NAME}"

npm ci
npm run build
