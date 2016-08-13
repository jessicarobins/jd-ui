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
           return $user.favorite(item.name);
       };
       
       self.toggleFavorite = function(item){
            $user.toggleMenuFavorite(item.name);
       };
       
    }
});