module.component('userSettings', {
    templateUrl: 'app/components/main/sidebar/user-settings/user-settings.template.html',
    controller: function($user) {
            
       var self = this;
       
       self.menuOptions = [
           {name: 'tags', icon: 'label'}, 
           {name: 'add children', icon: 'add'},
           {name: 'add link', icon: 'link'},
           {name: 'comment', icon: 'comment'},
           {name: 'expand', icon: 'fullscreen'},
           {name: 'bookmark', icon: 'bookmark'},
           {name: 'delete', icon: 'delete'}];
       
       self.$onInit = function(){
           self.favorites = $user.user().user_setting.menu_favorites;
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