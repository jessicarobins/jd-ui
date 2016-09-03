require('../../../../services/projects.service');
require('../../../../services/specs.service');
require('../../../../services/tagtypes.service');
require('../../../../services/users.service');
require('../../../../services/params.service');
require('../../../../services/breadcrumbs.service');

require('./filter.scss');

var jessdocs = require('jessdocs');
jessdocs.
  component('filter', {
    template: require('./filter.template.html'),
    controller: function (
      $filter,
      $projects, 
      $specs, 
      $tagtypes,
      $user,
      ParamService,
      spinnerService,
      $stateParams,
      BreadcrumbsService) {
        
      var self = this;
      
      self.formData = {};
      self.selected = [];
      self.ticketed = false;
      self.commented = false;
      
      self.$onInit = function() {
        
        self.initCheckboxes();

        $projects.getProjects().then( function(response) {
            self.projects = response;
            self.formData.project = $projects.project();
        });
        
        $projects.addCallback( function(){
            self.projects = $projects.projects;
            self.formData.project = $projects.project();
        });
        
        $projects.addCurrentProjectCallback( function(){
            self.formData.project = $projects.project();
        });
        
        $tagtypes.getTagTypes().then( function(response){
            self.tag_type_groups = response.byGroup;
            self.selected = $tagtypes.sanitizeTagTypes(self.selected, false);
        });
        
        $tagtypes.addCallback( function(){
            self.tag_type_groups = $tagtypes.tagTypes.byGroup;
        });
        
        $tagtypes.addDeleteCallback( function(){
          var santized = $tagtypes.sanitizeTagTypes(self.selected, true);
          self.selected = santized;
          self.submit();
        });
        
        $user.addOrgCallback(self.clearCheckboxes);
        
      }; 
      
      self.initCheckboxes = function(){
        self.ticketed = $stateParams.ticketed;
        self.commented = $stateParams.commented;
        self.selected = $stateParams.tag_type || [];
      };
      
      self.clearCheckboxes = function(){
        self.ticketed = false;
        self.commented = false;
        self.selected = [];
      };
      
      
      self.toggle = function (item) {
        var idx = self.selected.indexOf(item);
        if (idx > -1) {
          self.selected.splice(idx, 1);
        }
        else {
          self.selected.push(item);
        }
        self.submit();
      };
      
      self.checked = function(item) {
        return _.includes(self.selected, item.id);
      };
      
      self.toggleTicketed = function() {
        self.ticketed = !self.ticketed;
        self.submit();
      };
      
      self.toggleCommented = function() {
        self.commented = !self.commented;
        self.submit();
      };
      
      self.changeProject = function() {
        var project = self.formData.project;
        $projects.setCurrentProject(project);
        BreadcrumbsService.clearBreadcrumbs();
        self.submit();
      };
        
      self.submit = function() {
        spinnerService.show('spinner');
        ParamService.updateURL({
          projectId: self.formData.project.id,
          ticketed: self.ticketed,
          commented: self.commented,
          tag_type: self.selected
        });
        var params = {
          project_id: self.formData.project.id,
          "tag_types[]": self.selected,
          ticketed: self.ticketed,
          commented: self.commented,
          id: $specs.filterParams.id
        };
        
        $specs.setSpecList(params).then(function(){
          spinnerService.hide('spinner');
        });
        
        
      };
      
    }
    
  });