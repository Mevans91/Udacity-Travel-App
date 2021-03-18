This is my capstone project for the Udacity Front End Nanodegree course.
It uses three different APIs to project a two week forecast for a given location,
anywhere on earth. 

It uses the Geonames API to pull the latitude and longitude coordinates from a 
location provided by the user. It then passes those coordinates to the WeatherBit API
to find the two week forecast for that location and the surrounding area.

Then the Pixabay API is used to find a picture for the provided location and displays
it along with the forecast and a countdown to the day the user provides, when they plan to
leave for the trip.

From a list Udacity provided, I chose to use two items from the list to make my project stand 
out. I chose to forecast multiple days, displaying two weeks ahead, and also I chose to add 
icons to the forecast. Weather icons from the FontAwesome library are used to represent
their appropriate weather conditions.

Api keys are temporarily in the code for submission purposes, but will be hidden again later.