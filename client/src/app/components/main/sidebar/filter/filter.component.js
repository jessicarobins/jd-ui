module.
  component('filter', {
    templateUrl: 'app/components/main/sidebar/filter/filter.template.html',
    controller: function (
      $filter,
      $projects, 
      $specs, 
      $tagtypes,
      $state,
      BreadcrumbsService) {
        
      var self = this;
      
      self.formData = {};
      self.selected = [];
      self.ticketed = false;
      self.formData.tag_types = [];
      
      self.$onInit = function() {
        
        $projects.getProjects().then( function(response) {
            self.projects = response;
            // if(self.projects.length){
            //     self.formData.project = self.projects[0].id;
                
            // }
            self.formData.project = $projects.project().id;
        });
        
        $projects.addCallback( function(){
            self.projects = $projects.projects;
            self.formData.project = $projects.project().id;
        });
        
        $tagtypes.getTagTypes().then( function(response){
            self.tag_type_groups = response.byGroup;
        });
        
        $tagtypes.addCallback( function(){
            self.tag_type_groups = $tagtypes.tagTypes.byGroup;
        });
        
      }; 
      
      
      self.toggle = function (item) {
        var idx = self.selected.indexOf(item);
        if (idx > -1) {
          self.selected.splice(idx, 1);
          self.formData.tag_types[item] = false;
        }
        else {
          self.selected.push(item);
          self.formData.tag_types[item] = true;
        }
        self.submit();
      };
      
      self.toggleTicketed = function(checkbox) {
        if(!checkbox){
          self.formData.ticketed = !self.formData.ticketed;
        }
        self.ticketed = !self.ticketed;
        self.submit();
      };
      
      self.changeProject = function() {
        var project = $filter('getById')(self.projects, self.formData.project);
        $projects.setCurrentProject(project);
        $state.transitionTo('home', {projectId: project.id}, { notify: false });
        BreadcrumbsService.clearBreadcrumbs();
        self.submit();
      };
        
      self.submit = function() {
        var params = {
          project_id: self.formData.project,
          "tag_types[]": self.selected,
          ticketed: self.ticketed
        };
        
        $specs.setSpecList(params).then( function(result) {
        });
        
        
      };
      
    }
    
  });