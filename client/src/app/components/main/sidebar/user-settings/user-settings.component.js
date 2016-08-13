module.component('userSettings', {
    templateUrl: 'app/components/main/sidebar/user-settings/user-settings.template.html',
    controller: function($user) {
            
       var self = this;
       
       self.menuFavorites = true;
       
       self.$onInit = function(){
           self.favorites = $user.user().user_setting.menu_favorites;
           self.menuOptions = $user.menuOptions;
       };
       
       self.favorite = function(item){
           return _.includes(self.favorites, item.name);
       };
       
       self.toggleFavorite = function(item){
            if(self.favorite(item)){
                _.pull(self.favorites, item.name);
            }
            else {
                self.favorites.push(item.name);
            }
       };
       
       self.save = function(){
           
       };
    }
});