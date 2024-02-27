# Agile Methodologies

* **Agile Methodologies**
  * [Overview](#overview)
  * [Sprint Notes](#sprint-notes)
    * [Sprint 1](#sprint-1)
    * [Sprint 2](#sprint-2)
  * [Milestones](#milestones)
  * [Learning Outcomes](#learning-outcomes)

<hr>

## **Overview**

<hr>

### *Sprint 1*

The first sprint was all about getting everything set up and a very basic authentication working. This sprint was set to be finished before my next mentor meeting on the 20th February.

During this sprint, the first task was to get a profiles model up and running with authentication. The next task was to get all my models in place with CRUD functionality only on the "Post model". This was all done on my brick connect api backend workspace. Once both these tasks were completed, the first deployment was done to Heroku, which is where I encountered my first issue. When the deployment was complete and the build was successful, the app would display a "Deployment application error" without any real explanation why. I solved the issue by trolling through the Heroku logs and eventually noticing something was wrong within my "Procfile". After altering a typo within the Procfile, the app ran straight away. This bug was created by myself while using the Code Institute deployment instructions for Django Rest Framework.

Next was to start building the front end with ReactJS. The task was to build a completely basic sign up and sign in forms to confirm authentication was working and communication was working between front end and back end. 

I can confirm all tasks within this sprint are completed and before the schedule date. I finished 2 days ahead of schedule on the 18th February.

<hr>

### *Sprint 2*

In this sprint the main goal was to get posts rendering with CRUD functionality. I gave myself a week to make these changes.

The first task was get a post form added with the ability to add a title, description and image. Once the post is created, I opted to list my posts and use infinite scroll to keep the user scrolling. I also created a post page which is entered by clicking the post. Once on the post page I added the functionality to delete the post or edit the post if authenticated. This concludes the CRUD functionality with create, read, update and delete.

I added extra options to my navigation, being feed, liked, and favourited. This is the point I ran into problems with my liked page and feed page were all showing the same posts in the same order. After making adjustments to my posts in the backend API, I was able to use Django filters to fix this issue. The favourited and feed nav link will be wired up in a different sprint. 

I also added the option for a user to log out and see that they are logged in by seeing their profile image. The profile is yet to be wired up and will be completed in a future sprint.

All tasks were completed ahead of schedule with a day to spare.

<hr>

## **Milestones**

<hr>

## Learning Outcomes
