PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  //client only code
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    }
  });
  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    }
  });
}
if(Meteor.isServer){
  //server only code
}
