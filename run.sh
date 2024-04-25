#!/bin/bash

# Open multiple tabs in gnome-terminal
gnome-terminal --tab --title="Run backend" -- bash -c 'cd backend && yarn dev; exec bash'
gnome-terminal --tab --title="Build css" -- bash -c 'cd frontend && yarn build:css; exec bash'
gnome-terminal --tab --title="Run frontend" -- bash -c 'cd frontend && yarn start; exec bash'
