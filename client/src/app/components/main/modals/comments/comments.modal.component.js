module.component('commentsModal', {
     templateUrl: 'app/components/main/modals/comments/comments.modal.template.html',
     controller: function($mdDialog) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            
        };
        
    }
    
});