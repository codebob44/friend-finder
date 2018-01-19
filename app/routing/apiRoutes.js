// Link routes to data arrays of info on all possible friends.
var friends = require("../data/friends");

// Routing
module.exports = function(app) {

  // API GET Requests to show JSON of data when user visits a link.
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Request submits form data to the server.
  // Submits form data (a JSON object) and pushes data to the appropriate array.
  app.post("/api/friends", function(req, res) {

    // The "server" will respond to a user"s survey result
    // Then compares those results against every user in the database.
    // Then calculates the difference between each of the numbers and the user"s numbers.
    // Then chooses the user with the least differences as the "best friend match."
    // In the case of multiple users with the same result it will choose the first match.
    // After the test, it pushes the user to the database.

    // Object to hold the "best match". Constantly updates as options are looped through.
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Parse the result of the user's survey POST.
    var userData = req.body;
    var userScores = userData.scores;

    // Calculate the difference between the user's scores and the scores of
    // each user in the database.
    var totalDifference = 0;

    // Loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      // Loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // Calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    // Save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });

};
