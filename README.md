This app allows users to look up current weather information for cities around the world.

By default weather details of current city is shown if user grant geo-location permission.

### Please visit [orange-berry.surge.sh](https://orange-berry.surge.sh) for live demo.

# Table of Contents
1. [Location prompt](#Location-prompt)
2. [List page](#List-page)
    1. [Delete city from list](#Delete-city-from-list)
    2. [Set as favourite](#Set-as-favourite-❤️)
    3. [City Search](#City-Search)
3. [Detail Page](#Detail-Page)
    1. [Add user note](#Add-user-note)
    2. [Update user note](#Update-user-note)
    3. [Delete user note](#Delete-user-note)

## Location prompt
After opening, the app will ask for location permission, as shown below:

![AskingForLocationpermission](/doc/images/AskingForLocationpermission.png)

If granted, weather details for curreny city will be displayed on [Detail Page](#Detail-Page)

If location is denied or if the browser does not have support for geo-location then user will be redirected to [List page](#List-page)

## List page
List page by default shows a list of 15 largest cities of world by population, along with current temperature.

User can add/remove cities to list which will be persisted and displyed for subsequent page visits.

![listPage](/doc/images/listPage.png)


On click of any item in list [Detail Page](#Detail-Page) for that city will open.

### Delete city from list
User can remove the cities from default list by clicking the top-right cross icon which appears oon mouse hover for each city item.

![DeleteCity](/doc/images/DeleteCity.png)


### Set as favourite ❤️
Cities can be marked as favourite which will be prioritized by placing those at the top of the list on subsequent visit to the list page.
Mouse click on he heart icon on the right against each city item will toggle the city as favourite and not-favourite.

Refer the screenshot above 👆


### City Search
Cities can be added to the list by using the search functionalities on top the [List page](#List-page)

Click on the searcj input and type to search for city. Multiple cities can be added in single search.

![citySearchResult](/doc/images/citySearch.png)

to close the search click on the cross icon on the right of the search input.

![closeSearchResults](/doc/images/closeSearchResults.png)


## Detail Page
Detail page displays more weather information for a particular city.

![weatherDetilPage](/doc/images/weatherDetilPage.png)

### Add user note
To add not type your comment on the textarea at right and click on Add.

Added notes will be displayed at the bottom of the textarea.
![usernoteDisplay](/doc/images/usernoteDisplay.png)

### Update user note
User can edit note by clicking on the `Edit` link at the right-bottom of each note which appears on mouse-hover on the note.
![noteDeleteEditIcon](/doc/images/noteDeleteEditIcon.png)
Edit the note text and click `Update`.
![noteUpdateForm](/doc/images/noteUpdateForm.png)

### Delete user note
Note can be delete same way as edit, by clicking on the `X` icon link at the right-top of each note, appears on mouse-hover on the note.





