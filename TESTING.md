# Brick Connect Testing

# Testing

* [**Testing Overview**](#testing-overview)
* [**Bugs**](#bugs)
* [**Lighthouse**](#lighthouse)
  * [**Home Page**](#home-page)
    * [*Desktop*](#home-desktop)
    * [*Mobile*](#home-mobile)
  * [**Feed Page**](#feed-page)
    * [*Desktop*](#feed-desktop)
    * [*Mobile*](#feed-mobile)
  * [**Favourited Feed Page**](#favourited-feed-page)
    * [*Desktop*](#favourited-feed-desktop)
    * [*Mobile*](#favourited-feed-mobile)
  * [**Liked Feed Page**](#liked-feed-page)
    * [*Desktop*](#liked-feed-desktop)
    * [*Mobile*](#liked-feed-mobile)
  * [**Profile Page**](#profile-page)
    * [*Desktop*](#profile-desktop)
    * [*Mobile*](#profile-mobile)
  * [**Post With Comments Page**](#post-with-comments-page)
    * [*Desktop*](#post-page-with-comments-desktop)
    * [*Mobile*](#post-page-with-comments-mobile)
  * [**Notifications Page**](#notifications-page)
    * [*Desktop*](#notifications-page-desktop)
    * [*Mobile*](#notifications-page-mobile)
  * [**Sign In Page**](#sign-in-page)
    * [*Desktop*](#sign-in-page-desktop)
    * [*Mobile*](#sign-in-page-mobile)
  * [**Sign Up Page**](#sign-up-page)
    * [*Desktop*](#sign-up-page-desktop)
    * [*Mobile*](#sign-up-page-mobile)
  * [**Add Post Page**](#add-post-page)
    * [*Desktop*](#add-post-page-desktop)
    * [*Mobile*](#add-post-page-mobile)
  * [**Scores Summary**](#scores-summary)
* [**Validation**](#validation)
  * [**CSS**](#css)
  * [**JavaScript**](#javascript)
* [**Manual Testing**](#manual-testing)
* [**Automated Testing**](#automated-testing)


<hr>

## **Testing Overview**

This project has been tested thoroughly by myself on a range of devices, including the iPhone 15 ProMax, iPhone 15, HP laptop, desktop PC, and through the Chrome Developer Tools options. I've also tested on different browsers, including Chrome, Safari, Microsoft Edge and Firefox. I have asked my friends and family to give the site a try and see if they can find any bugs and areas for improvement.

Full maunal test details can be found below.

<hr>

## **Bugs**
​
The following bugs were identified during user testing:

* Bug - The commented time was displaying as per date instead of minutes and hours.
* Cause - The comment serializer in the back end didn't have the natural time import.
* Resolution - Import naturaltime from django.contrib.humanize.templatetags.humanize

<br>

* Bug - Terminal error in Gitpod while trying to use 'npm start', running this command straight away would result in port 3000 not found, 'Error digital envelope routines::unsuported'
* Cause - After speaking to tutors and going through Slack it seemed the problem was due to using Gitpod.
* Resolution - Run 'nvm install 16' first then run 'npm start', after doing this port 3000 worked as it should.

​<br>

* Bug - When adding a post if the image was bigger than the container it would completely break the styling by overlapping all other parts of the page.
* Cause - Large images without appropriate styling in place.
* Resolution - Add styling for 'max-width' and 'max-height'.

​<br>

* Bug - Notifications not being created automatically with the signals.
* Cause - Typo within the notifications signals file by missing the 's' from the end of notifications.
* Resolution - Add the 's'.

​<br>

* Bug - Dropdown menus within the navbar when using the smaller screen navbar menu would not remain open when clicked but instead close the whole navbar.
* Cause - The click outside toggle function did not take into account the dropdown menus would require 2 clicks before the user would want to close the navbar menu.
* Resolution - Add an 'if statement' to check the innertext before closing down the navbar menu, if the innertext is equal to one of the dropdown toggle names the navbar will not close. 

<br>

* Bug - Terminal errors when interacting with the app when signed out. Specifically:
  - 401 errors on mount when not logged in
  - 401 errors when going to the sign/sign up page
  - 401 error when an access token has expired
* Cause - According to the Code Institute walkthrough project, these errors are normal and should be treated as feedback from the API.
* Resolution - These errors still persist. However, this has been regarded as normal behaviour and will not prevent the site from running as it should.  

​<br>

* Bug - Users were able to access post create pages when signed out, by using '/' then the path name.
* Cause - No defensive design present.
* Resolution - Used the useRedirect hook to redirect signed out users to the home page.

<br>

* Bug - Buttons remain blue after they were clicked remained blue until the user clicks somewhere else.
* Cause - Bootstrap class's taking priority
* Resolution - Added '!important' within the css to highlight the styling I want to be used.


<hr>

## **Unfixed Bugs**

* There's a bug in the app that prevents it from working properly on Apple mobile devices and many browsers except Chrome. The issue occurs when users try to log in, they get redirected back to the login page. This happens because cookies aren't being saved in the local storage. To fix this bug on Safari, users need to turn off "Prevent Cross-Site Tracking" in settings. Interestingly, the app works fine on Safari on iPhone 12 and iPhone 14 Pro Max once this setting has been changed, but not on Chrome for iOS. This also occurs when using an incognito browser.

* A small CSS bug causing a signed in user's comment thats been liked to have more margin. I noticed this on the day of submission. This doesn't break the site but still a bug. 

* The CSS related to the deployed version of the admin panel does not process. The admin panel still works, but it's harder to navigate. This happened after a debugging session with the tutors, and they were under the impression it would return. As of submission day, it hasn't returned. The admin panel has all its styling in production, which is why this leads me to believe it's to do with Heroku.

<hr>

## **Lighthouse**

The Lighthouse test results for all major pages can be found below. 

### Home Page

*Desktop*

![Home page desktop lighthouse](documentation/testing-screenshots/home-desktop.png)

*Mobile*

![Home page mobile lighthouse](documentation/testing-screenshots/home-mobile.png)

### Feed Page

*Desktop*

![Feed page desktop lighthouse](documentation/testing-screenshots/feed-desktop.png)

*Mobile*

![Feed page mobile lighthouse](documentation/testing-screenshots/feed-mobile.png)

### Favourited Feed Page

*Desktop*

![Favourited feed page desktop lighthouse](documentation/testing-screenshots/favourited-feed-desktop.png)

*Mobile* 

![Favourited feed page mobile lighthouse](documentation/testing-screenshots/favourited-feed-mobile.png)

### Liked Feed Page

*Desktop*

![Liked feed page desktop lighthouse](documentation/testing-screenshots/liked-feed-desktop.png)

*Mobile* 

![Liked feed page mobile lighthouse](documentation/testing-screenshots/liked-feed-mobile.png)

### Profile Page

*Desktop*

![Profile page desktop lighthouse](documentation/testing-screenshots/profile-page-desktop.png)

*Mobile*

![Profile page mobile lighthouse](documentation/testing-screenshots/profile-page-mobile.png)

### Post With Comments Page

*Desktop*

![Post page with comments desktop lighthouse](documentation/testing-screenshots/single-post-and-comments-desktop.png)

*Mobile*

![Post page with comments mobile lighthouse](documentation/testing-screenshots/single-post-and-comments-mobile.png)


### Notifications Page

*Desktop*

![Notifications page desktop lighthouse](documentation/testing-screenshots/notifications-desktop.png)

*Mobile*

![Notifications page mobile lighthouse](documentation/testing-screenshots/notifications-mobile.png)

### Sign In Page

*Desktop*

![Sign in page desktop lighthouse](documentation/testing-screenshots/signin-desktop.png)

*Mobile*

![Sign in page mobile lighthouse](documentation/testing-screenshots/signin-mobile.png)

### Sign Up Page

*Desktop*

![Sign up page desktop lighthouse](documentation/testing-screenshots/signup-desktop.png)

*Mobile*

![Sign up page mobile lighthouse](documentation/testing-screenshots/signup-mobile.png)

### Add Post Page

*Desktop*

![Add post page desktop lighthouse](documentation/testing-screenshots/add-post-desktop.png)

*Mobile*

![Add post page mobile lighthouse](documentation/testing-screenshots/add-post-mobile.png)


### Scores Summary

Certain scores across the whole site are generally quite low, mainly the "performance" score. This has mostly to do with images and Bootstrap CDN. The maximum image size is 5MB, I kept this size because I did not want to limit users too much with images or make it harder for users to post. This could be fine tuned in future builds. The best practices remained fairly consistent across the whole site, the best practices were primarily affected by cookies from Heroku and Cloudinary. Heroku is being used to host the site, and Cloudinary is being used to store the default images.

<hr>

## **Validation**

### ***CSS***

The CSS has been passed through the [W3C Jigsaw Validator](https://jigsaw.w3.org/css-validator/) both by direct text input and URL. 

App.js
![App.js CSS Validation Result](documentation/validation/app-css-validator.png)

Home
![Home CSS Validation Result](documentation/validation/home-css-validator.png)

Favourited Feed
![Favourited Feed CSS Validation Result](documentation/validation/favourited-feed-validator.png)

Posts and comments page
![Posts and comments page CSS Validation Result](documentation/validation/post-and-comments-css-validator.png)

Liked Feed
![Liked Feed CSS Validation Result](documentation/validation/liked-feed-css-validator.png)

Add Post
![Add Post CSS Validation Result](documentation/validation/add-post-css-validator.png)

Notifications Page
![Notifications page CSS Validation Result](documentation/validation/notifications-css-validator.png)

Sign In
![Sign In CSS Validation Result](documentation/validation/sign-in-css-validator.png)

Sign Up
![Sign Up CSS Validation Result](documentation/validation/sign-up-css-validator.png)

Profiles
![Profiles CSS Validation Result](documentation/validation/profile-css-validator.png)

<hr>

### ***JavaScript***

I used [ESLint](https://eslint.org/) to test my code for the front-end. The following issues were identified:

![ESLint screenshot](documentation/validation/eslint-testing-1.png)
![ESLint screenshot](documentation/validation/eslint-testing-2.png)

* All the errors seen in the above screenshots are fixed on the next line, when the test is re-run.

* The first error I encountered was to do with "'children' is missing in the props validation". This particular part of code was used with the Code Institute Moments walkthrough, for this reason and with the deadline approaching, I decided to create a rule to ignore this particular error.

* The ESLint also picked up on the lines of text that I'd used with an apostrophe. This was a simple fix by just adding one of the options that ESLint provided. 

* I encountered another error regarding 'missing display name'. I used [eslint-plugin-react Github](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md) to fix this error.

* Lastly, I came across another error relating to the 'empty block statement'. To fix this, I added a commented out console log, as advised to do within the moments walkthrough, for quicker debugging at a later date.

<hr>

## **Manual Testing**

### User Stories

<br>

#### As a unregistered user I can:

<br>

* User Story: As a User I can view the navbar from all pages so that I can navigate between pages easily
* Steps: Navigate across all pages to see if the navbar renders on ever page.
* Expected Outcome: The navbar should displayed at the top of every page, which includes links to pages for users to navigate
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/1)

<hr>

* User Story: As a User I can navigate through pages quickly and efficiently so that I can view the site content without a page refresh.
* Steps: Click on different parts of the page to see if the whole page makes a refresh or just individual components.
* Expected Outcome: When clicking on different parts of the page, only the individual component you are interacting with should change instead of causing a whole page refresh. Pages change without lag, and if there is loading time, a loading spinner is applied to confirm the request has been made.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/2)

<hr>

* User Story: As a User I can create a new account so that I can access the full sites features
* Steps: Go to the Sign up link in the navbar and fill out the form to create an account.
* Expected Outcome: A clear and intuitive sign up form requesting username, password and password confirmation is generated when the sign up link is selected from the navbar.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/3)

<hr>

* User Story: As a User who is logged out I can see sign in and sign up options so that I can sign in or sign up
* Steps: Look toward the top of the screen and see a Sign in and Sign up link
* Expected Outcome: A sign in and sign up link within the navbar at the top of the screen
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/7)

<hr>

* User Story: As a User I can view other users avatar so that I can easily identify that particular profile user
* Steps: Locate a post or popular posts component
* Expected Outcome: Avatar images are available for all users to use, and users have the option to use the default avatar, which will be created upon account sign up. Depending on the component, the avatar adjusts to the size of the component image.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/8)

<hr>

* User Story: As a User I can view the post detail so that I can learn more about the post
* Steps: Click on a post on the home page
* Expected Outcome: All users are able to view the posts and it's contents, icluding any comments relating to the post
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/10)

<hr>

* User Story: As a User I can view the most recent posts ordered by created first from top to bottom so that I can quickly be up to date with all the new posts
* Steps: Click on the home link or the logo wait for the posts to load
* Expected Outcome: Posts must be ordered by created at with the most recent posts at the top
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/12)

<hr>

* User Story: As a User I can search for post with keywords or by username so that I can find posts and user profiles I am most interested in
* Steps: Locate the search bar at the top of the home page
* Expected Outcome: Search bar should be located at the top of the post page and the Search tool should have a slight delay on looking for results to prevent constant page flashes
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/13)

<hr>

* User Story: As a User I can keep scrolling through the posts so that I don't have to keep pressing next page
* Steps: Create more then 10 posts and scroll down through the posts, check the scroll bar is getting smaller as ypu scroll indicating more posts are being rendered.
* Expected Outcome: Scrolling must keep flowing without stopping until end of post list
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/16)

<hr>

* User Story: As a User I can view other profile pages so that I can see information about their posts
* Steps: Locate a users profile name or avatar and click to proceed to their profile page
* Expected Outcome: Profile page should display users posts, followers count and following count. The profile page should display profile owner chosen avatar and bio.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/25)

<hr>

* User Story: As a User I can see how long ago the comments were posted so that I know how long ago the comment was made
* Steps: Proceed to a post and click on it to reveal the post detail page and comments
* Expected Outcome: Comment timestamp should be next to the profile name and comments should be in a easy to read format
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/20)

<hr>

* User Story: As a User I can read all comments on a post so that I can see what other people this of the post
* Steps: Proceed to a post and click on it to reveal the post detail page and comments
* Expected Outcome: Comments should be in a created at order with the newest comments at the top. Comments should have a line break and display the commenters username and timestamp.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/21)

<hr>

* User Story: As a User I can view a list of the most followed profiles so that I can see which profiles are the most popular
* Steps: Head to any page other then the sign in/up pages or the posting/editing pages.
* Expected Outcome: On the homepage the most followed profiles should display on the right for dektop and the top for mobile. Most followed list should display profile names and avatars
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/26)

<hr>

* User Story: As a User I can view all posts in a list so that see other peoples post one after another
* Steps: Head to the home page
* Expected Outcome: Posts should be well separated from each other and each post in list form should show the avatar of the profile that created it, the username, created date, icons for like, comment, favourite and post description. (only show favourited on signed in profiles)
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/35)

<hr>

* User Story: As a User I can keep scrolling through comments so that I don't have to keep going to the next page
* Steps: Create more then 10 comments and scroll down through the comments, check the scroll bar is getting smaller as you scroll indicating more comments are being rendered.
* Expected Outcome: Comments should keep rendering smoothly untill the end of the comments list
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/37)

#### As a Registered Site User I can:

<hr>

* User Story: As a User I can sign in to the site so that I can gain full access to the site
* Steps: Locate the sign up link in the navbar and fill in the username and password then clcik on the sign in button.
* Expected Outcome: The sign in form should be accessible from the navbar and display a clear intuitive form requesting username and password
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/4)

<hr>

* User Story: As a User I can see if I'm logged in or not so that log in if needed
* Steps: Use the sign in link to sign in and look at the navbar.
* Expected Outcome: The logged in user's username should be displayed next to the users avatar.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/5)

<hr>

* User Story: As a User I can maintain my logged in status until I choose to log out so that my user experience is not compromised
* Steps: Log in as usual and use the refresh button
* Expected Outcome: The user should remain logged in even after the refresh
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/6)

<hr>

* User Story: As a logged in user I can create posts so that I can share my images with the rest of the community
* Steps: Locate the 'Add post' in the navbar, fill in the form and add an image, click create.
* Expected Outcome: The user will be restricted to use images that are not to big to keep the site working efficiently and will be required to add a title and a category. However the decription will be optional. 
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/9)

<hr>

* User Story: As a logged in user I can like or remove my like from a post so that I can express my liking of the post or remove the like if I choose to do so
* Steps: Scroll through the posts list on the home page, use the heart icon to like other users posts, and click the icon again to unlike the posts.
* Expected Outcome: When a post is liked, the icon will display as a solid icon to separate them from each other. The post owner can't like their own posts.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/11)

<hr>

* User Story: As a logged in user I can view posts I've liked so that I can share them with other or just revisit them
* Steps: Click on the feeds dropdown button in the navbar, the click 'Liked'.
* Expected Outcome: The liked feed should only display posts that the logged in user has liked.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/14)

<hr>

* User Story: As a logged in user I can view my favourite posts so that I can separate my general liked posts from my favourites
* Steps: Click on the feeds dropdown button in the navbar, the click 'Favourited'.
* Expected Outcome: The Favourited feed should only display posts that the logged in user has Favourited.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/15)

<hr>

* User Story: As a post owner I can edit my post title, description and change the image so that my post can be corrected or updated after it was posted
* Steps: Locate a post owned by the signed in user, click the three dots in the top right hand corner, click edit, and adjust the pre populated form.
* Expected Outcome: Once the edit button is clicked, the post edit should display placeholder text from the original post. Post editing is only available for the post owner.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/18)

<hr>

* User Story: As a User I can delete my posts so that remove any posts I don't want to display
* Steps: Locate a post owned by the signed in user, click the three dots in the top right hand corner, click delete, confirm deletion in the pop up modal.
* Expected Outcome: Once the delete button is clicked, this will trigger a confirmation modal and the post should be deleted and completely removed from the site.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/34)

<hr>

* User Story: As a logged in user I can create a comment on a post so that I can share my thoughts about the post
* Steps: Click on a post and scroll down to the comments section at the bottom. Type the comment and click post.
* Expected Outcome: The comment will display below the post with other users comments
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/19)

<hr>

* User Story: As a owner of a comment I can delete my comment so that I have removal control over my comments
* Steps: Locate the post that has the signed in user comment on it, click the three dots at the end of the comment card, and click delete, confirm deletion in the pop up modal.
* Expected Outcome: The delete button will trigger a modal for confirmation, and once delete in the modal is selected, the comment will be removed from the whole site and the comment count will go down by 1.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/22)

<hr>

* User Story: As a owner of a comment I can edit the comment so that I can fix or update the comment
* Steps: Locate the post that has the signed in user comment on it, click the three dots at the end of the comment card, select edit. Adjust the pre-populated comment form.
* Expected Outcome: Once the edit button is clicked, the comment edit should display placeholder text from the original comment. Comment editing is only available for the Comment owner.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/23)

<hr>

* User Story: As a logged in user I can like a comment so that I can express myself without having to make a comment
* Steps: Locate a post with comments already within it, scroll down to the comments section. Use the heart icon the like the comment
* Expected Outcome: When the heart icon is clicked the comment like count will increase and the icon will become solid but the comment owner can't like their own comments.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/24)

<hr>

* User Story: As a logged in user I can follow and unfollow so that I can control the specific posts within my feed
* Steps: Use the follow button and unfollow button within the popular profiles list or on the profile page of the user you want to follow or unfollow.
* Expected Outcome: Following another user should place their posts in my feed, follow and unfollow should be the same button but change depending on its status. When a user is followed the follow count and following count is adjusted on the appropriate account.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/27)

<hr>

* User Story: As a logged in user I can edit my profile so that I can update my information
* Steps: Click on the signed in profile avatar/name in the navbar, click the three dots icon in the top right of the profile page, select edit profile.
* Expected Outcome: Once the edit button is clicked, the user will have all their original information displayed, with the option to change their bio and profile image. The user must be the profile owner to edit their profile.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/28)

<hr>

* User Story: As a logged in user I can update my username and password so that update my display name and keep my profile secure
* Steps: Click on the signed in profile avatar/name in the navbar, click the three dots icon in the top right of the profile page, select change username or change password.
* Expected Outcome: The username form should display a blank single field form. The password should have two fields in a form asking for a new password and confirmation of the new password. To change the password or username, the user must be the profile owner.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/29)

<hr>

* User Story: As a User I can log out of my profile so that I can keep my profile secure
* Steps: Locate the sign out button in the navbar at the top of the page, click sign out, confirm sign out in the modal.
* Expected Outcome: Once the sign out button is clicked the user should confirm this was their intention by clicking confirm in a modal.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/31)

<hr>

* User Story: As a User I can favourite a post so that I can come back to them for inspiration 
* Steps: Locate a post you want to favourite and click on the star icon to add the post to favourited. Click on the icon again to remove from the favourited feed.
* Expected Outcome: The favourite icon should be outlined when the post is not favourited and solid when the post is favourited. The icon will only display for signed in users.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/36)

<hr>

* User Story: As a User I can receive notifications so that I can get updated when someone follows my profile or has made comment on my post
* Steps: Follow a different account and comment on their post, sign into their profile and click on the notifications link in the navbar. Check the notifications to see if they are related to the comment that has just been made on the account and if someone has followed the account.
* Expected Outcome: The notification for the commented post should indicate which post has been commented on with a link to the post. The follow notification should display the user who made the follow. The user should be able to mark notifications as read with a clear indication for unread notifications.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/39)

<hr>

* User Story: As a User I can click on delete/sign out and get a pop up so that I can confirm I defiantly want to do these things
* Steps: Click on any deletion or sign out button accros the site.
* Expected Outcome: If one of the buttons is triggered the modal should appear from the top of the screen, awaiting confirmation for the particular action.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/40)

<hr>

* User Story: As a User I can categorise my post so that other users can find my posts easier
* Steps: Click on the category button in the navbar to open the drop down and select a category. When making a post use the dropdown to select which category to put the post in.
* Expected Outcome: Only two categories  should be available (DIY builds -- Full set builds). The category dropdwon should be part of the post creation form.
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/43)

<hr>

* User Story: As a User I can see a pop up so that I know I have done something successfully or there was a problem
* Steps: Pop ups can be triggered from mulitiple situations. Sign in to a profile and watch the top of the screen 
* Expected Outcome: A small pop up should be displayed saying welcome with the profile owners username. Pop ups should display success messages and unsuccessful messages. Pop ups should happen upon editing and deleting
* Result: [Test passed](https://github.com/Antonyeaster/brick-connect-react/issues/46)

<hr>

## **Automated testing**

Automated testing was performed on the following files:

* SignUpForm.js
  * Tested if the page is rendering and if the placeholder text and button is displaying.
* SignInForm.js
  * Tested if the page is rendering and if the placeholder text and button is displaying.
* Notifications.js
  * Tested notifications for signed in users and if the page is rendering the notifications title.
* NotFound.js
  * Tested rendering by looking for the text
* Asset.js
  * Tested rendering the spinner by using a test id which I linked with the spinner in the Asset.js file.
* Navbar.js
  * Tested rendering the navbar, including rending the current user. Tested going through the modal and confirming sign out to be able to access the sign in and sign up text.

![Tests run](documentation/testing-screenshots/tests-run.png)
![Passed tests](documentation/testing-screenshots/passed-test.png)

<hr>

Back to [README](/README.md)