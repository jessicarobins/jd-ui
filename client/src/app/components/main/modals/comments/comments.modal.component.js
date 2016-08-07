module.component('commentsModal', {
    bindings: {
        spec: '<'
    },
     templateUrl: 'app/components/main/modals/comments/comments.modal.template.html',
     controller: function($mdDialog, $api) {
             
        var self = this;
        
        self.$onInit = function() {
            console.log(self.spec)
        };
        
        self.add = function(){
            $api.request({
                url: '/comments',
                method: 'POST',
                data: {
                    comment: {
                        text: self.text,
                        spec_id: self.spec.id
                    }
                }
            }).then( function(response){
               self.spec.comments.push(response);
               self.text = '';
            });
        };
        
        self.disableSave = function(){
            return !self.text 
                || (self.text.length < 1);
        };
        
    }
    
});