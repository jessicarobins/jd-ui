module.component('manage', {
    
    templateUrl: 'app/components/main/manage/manage.template.html',
    controller: function($tagtypes) {
       var self = this;
       self.$onInit = function(){
           
           
            $tagtypes.getTagTypesByGroup();
       };
       
       
    }
});