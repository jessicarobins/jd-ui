module.component('commentsModal', {
    bindings: {
        spec: '<'
    },
     templateUrl: 'app/components/main/modals/comments/comments.modal.template.html',
     controller: function($mdDialog, $api) {
             
        var self = this;
        
        self.$onInit = function() {
            console.log(self.spec)
            self.groupedComments = _.groupBy(self.spec.comments, 'resolved');
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
               self.groupedComments.false.push(response);
               self.text = '';
            });
        };
        
        self.resolve = function(comment){
            $api.request({
                url: '/comments/' + comment.id + '/resolve',
                method: 'PUT'
            }).then(function(){
                self.groupedComments.true.push(comment);
                _.pull(self.groupedComments.false, comment);
            });
        };
        
        self.disableSave = function(){
            return !self.text 
                || (self.text.length < 1);
        };
        
    }
    
});