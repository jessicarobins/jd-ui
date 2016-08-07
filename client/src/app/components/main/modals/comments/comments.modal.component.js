module.component('commentsModal', {
    bindings: {
        spec: '<'
    },
     templateUrl: 'app/components/main/modals/comments/comments.modal.template.html',
     controller: function($mdDialog, $api) {
             
        var self = this;
        
        self.$onInit = function() {
            self.spec.grouped_comments_json.false = self.spec.grouped_comments_json.false || [];
            self.spec.grouped_comments_json.true = self.spec.grouped_comments_json.true || [];
        };
        
        self.hasComments = function(){
            return self.spec.grouped_comments_json.false.length ||
                self.spec.grouped_comments_json.true.length;
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
               self.spec.grouped_comments_json.false.push(response);
               self.spec.open_comments_count += 1;
               self.text = '';
            });
        };
        
        self.resolve = function(comment){
            $api.request({
                url: '/comments/' + comment.id + '/resolve',
                method: 'PUT'
            }).then(function(){
                self.spec.grouped_comments_json.true.push(comment);
                _.pull(self.spec.grouped_comments_json.false, comment);
                self.spec.open_comments_count -= 1;
            });
        };
        
        self.disableSave = function(){
            return !self.text 
                || (self.text.length < 1);
        };
        
    }
    
});