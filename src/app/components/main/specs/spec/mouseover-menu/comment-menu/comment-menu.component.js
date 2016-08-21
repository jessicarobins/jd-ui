require('../../../../../../services/api.service');

require('./comment-menu.scss');

var jessdocs = require('jessdocs');
jessdocs.component('commentMenu', {
    require: {
        parent: '^^spec'
    },
    bindings: {
        spec: '<'
    },
    template: require('./comment-menu.template.html'),
    controller: function($api) {
        
        var self = this;
         
        self.$onInit = function(){
            self.spec.grouped_comments_json.false = self.spec.grouped_comments_json.false || [];
            self.spec.grouped_comments_json.true = self.spec.grouped_comments_json.true || [];  
        };
        
       self.openCommentMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        
        self.hasComments = function(){
            return self.spec.grouped_comments_json.false.length ||
                self.spec.grouped_comments_json.true.length;
        };
        
        self.formatTime = function(comment){
            var time = moment(comment.created_at).format('M/D');
            return time;
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
    }
});