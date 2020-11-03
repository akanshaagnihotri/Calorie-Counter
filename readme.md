## Setup
1. Clone the repository
2. In the root, run `yarn install`
3. Get your `GoogleService-Info.plist` from Firebase console and paste it in `./ios/(here)`
4. Open ios project in XCode and Update the url-schema as mentioned <a href="https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project">here</a>
5. Setup Firebase for Android using the guide available <a href="https://rnfirebase.io/#2-android-setup">Here</a>. Please note that we also need to have debug signing certificate
6. Copy `env.example` & create `.env` in project root directory
7. Add your `web_client_id` to `.env` from firebase console.
8. `cd ios && pod install`
9. `cd .. && yarn run ios`
