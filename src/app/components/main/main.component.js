require('../../services/projects.service');
require('../../services/breadcrumbs.service');
require('../../services/params.service');
require('../../services/specs.service');
require('../../services/users.service');
require('../../services/tagtypes.service');
require('../../services/api.service');

require('./specs/specs.component');
require('../header/header.component');
require('./sidebar/sidebar.component');
require('./fab/fab.component');

require('./main.scss');

var jessdocs = require('jessdocs');
jessdocs.component('main', {
    template: require('./main.template.html'),
    controller: function(
        $auth,
        $q,
        $api,
        $projects,
        BreadcrumbsService,
        ParamService,
        $specs,
        $user,
        $tagtypes,
        $state,
        $stateParams) {
       var self = this;
       
       self.canWrite = false;
       
       self.$onInit = function(){
            sanitizeOrgParam($stateParams.orgId);
            self.canWrite = $user.write();
            var project;
            
            var promises = {
                tickets: $api.request({url: '/tickets'}),
                tags: $api.request({url: '/tags'}),
                projects: $projects.getProjects(),
                tagTypes: $tagtypes.getTagTypes(),
                breadcrumbs: BreadcrumbsService.initBreadcrumbsFromId($stateParams.spec_id)
            };
            
            $q.all(promises).then( function(response) {
                self.tickets = response.tickets;
                self.tags = response.tags;
                project = sanitizeProjectParam($stateParams.projectId);
                var tagTypes = sanitizeTagTypes(response.tagTypes.allTypes, $stateParams.tag_type);
                return tagTypes;
            }).then( function(response){
                var params = ParamService.parseParamsFromURL(project.id, response);
                $specs.setSpecList(params);
            });
            
            $user.addOrgCallback( function(){
                $tagtypes.updateGroups();
                $tagtypes.updateTagTypes();
                BreadcrumbsService.clearBreadcrumbs();
               $projects.updateProjects().then( function(response){
                   $projects.setCurrentProject(response[0]);
                   return response;
               }).then( function(projects){
                   ParamService.changeOrg($user.currentOrg().id, $projects.project().id);
                   self.canWrite = $user.write(); 
                   $specs.setSpecList({project_id: $projects.project().id});
               });
               
            });
            
       };
       
       function sanitizeProjectParam(id){
           var project = _.find($projects.projects, {id: id});
           if(!project){
               project = $projects.projects[0];
               ParamService.updateURL({projectId: project.id});
           }
        //   $projects.currentProject = project;
            $projects.setCurrentProject(project);
           return project;
       }
       
       function sanitizeOrgParam(id){
           var org = _.find($user.organizations(), {id: id});
           if(!org){
               org = $user.organizations()[0];
               ParamService.updateURL({orgId: org.id});
           }
           $user.initOrg(org);
           
       }
       
       function sanitizeTagTypes(validTypes, typeParams){
           typeParams = typeParams || [];
           var validIds = _.map(validTypes, 'id') || [];
           var intersection = _.intersection(typeParams, validIds) || [];
           if(intersection.length < typeParams.length){
               ParamService.updateURL({tag_type: intersection});
           }
           return intersection;
       }
       
       function sanitizeSpecId(specId){
           
       }
    }
});