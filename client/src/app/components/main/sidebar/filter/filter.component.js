module.
  component('filter', {
    templateUrl: 'app/components/main/sidebar/filter/filter.template.html',
    controller: function (
      $projects, 
      $specs, 
      $tagtypes) {
        
      var self = this;
      
      self.formData = {};
      self.selected = [];
      self.ticketed = false;
      
      self.$onInit = function() {
        
        $projects.getProjects().then( function(response) {
            self.projects = response;
            if(self.projects.length){
                self.formData.project = self.projects[0].id;
            }
        });
        
        $projects.addCallback( function(){
            self.projects = $projects.projects;
        });
        
        $tagtypes.getTagTypes().then( function(response){
            self.tag_type_groups = response.byGroup;
        });
        
        $tagtypes.addCallback( function(){
            self.tag_type_groups = $tagtypes.tagTypes.byGroup;
        });
        
      }; 
      
      
      self.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
        self.submit();
      };
      
      self.toggleTicketed = function() {
        self.ticketed = !self.ticketed;
        self.submit();
      };
      
      self.changeProject = function() {
        $projects.currentProject = self.formData.project;
        console.log('current project = ', $projects.currentProject);
        self.submit();
      };
        
      self.submit = function() {
        // var formParams = "?" + $httpParamSerializerJQLike($scope.formData);
        // $location.search($scope.formData);
        // console.log(self.formData)
        var params = {
          project_id: self.formData.project,
          "tag_types[]": self.selected,
          ticketed: self.ticketed
        };
        
        $specs.setSpecList(params).then( function(result) {
          console.log(result);
        });
        
        
      };
      
    }
    
  });