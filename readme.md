## Food Identification and Calorie Calculation Cross Platform Application
The application can identify the visually detectable ingredients in the food and, recognise weight for each ingredient and calculate the total amount of calories based upon it. The user can create their profile and set up a daily calorie goal. Upon uploading each food image, the total percentage of calories consumed for the day would be shown on the user dashboard which would help the user keep track of his daily calorie intake. 

## Setup
1. Clone the repository
2. In the root, run `yarn install`
3. Open ios project in XCode and Update the url-schema as mentioned <a href="https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project">here</a>
4. `cd ios && pod install`
5. `cd .. && yarn run ios`

![Application GIF](./src/assets/application.gif)

