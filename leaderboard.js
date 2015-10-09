PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  //client only code
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId === selectedPlayer){
        return "selected"
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });
  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5}});
    },
    'click .remove':function(){
      var selectedPlayer = Session.get('selectedPlayer');
      var deletePlayer = PlayersList.findOne(selectedPlayer);
      var answer = confirm("Are you sure you want to delete "+deletePlayer.name+"?");
      if(answer){
        PlayersList.remove(selectedPlayer);
      } else{
        console.log('you cancelled!');
      }

    }
  });
  Template.addPlayerForm.events({
    'submit form': function(e, template){
      e.preventDefault();
      var playerNameVar = e.target.playerName.value;
      var playerScoreVar = parseInt(e.target.playerScore.value);
      PlayersList.insert({
        name: playerNameVar,
        score: playerScoreVar
      });
      template.find('form').reset();
    }
  })
}
if(Meteor.isServer){
  //server only code
}
