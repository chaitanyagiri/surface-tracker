# Surface Tracker

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Improvements
Since the scope of this project can range from simple to very complex depending upon requirements, hence a lot could have been done to make it even better here are some of the ideas that could be implemented to make it even more robust:
* Since backend apis are run in a serverless manner hence data captured is not persistent, we can ideally implement a persistent queue to ensure deliverability of events.
* Work on responsiveness even further, try to make it optimised every screensize
* We can index database according to the surface_tag since currently system seems to be read heavy
* Furthermore a validation and authentication middleware can be implemented.
* Improved logging, add monitoring and triggers etc...

## Screenshots
<img width="1440" alt="Screenshot 2024-09-18 at 10 40 08 PM" src="https://github.com/user-attachments/assets/2213c23f-79d7-40fa-a55b-160b041bed6b">
<img width="1440" alt="Screenshot 2024-09-18 at 10 38 24 PM" src="https://github.com/user-attachments/assets/ff0b5162-ce84-4b8b-a282-449521022fcf">
<img width="1440" alt="Screenshot 2024-09-18 at 10 38 16 PM" src="https://github.com/user-attachments/assets/3f6ed9aa-a28a-45c0-b003-d389c9a45dd2">

## Environment Variables?

Only postgres database url is required as variable 'DATABASE_URL'
