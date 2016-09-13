import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

var MenuComponent = React.createClass ({
  
  getMenuItems: function() {
    const spec = this.props.spec;
    let opts;
    if(spec.bookmarked){
      opts = _.reject(this.props.menuOptions, {name: 'bookmark'});
    } else {
      opts = _.reject(this.props.menuOptions, {name: 'unbookmark'});
    }
    return opts.map(function(menuItem){
      return (
        <MenuItem 
          key={menuItem.name}
          onTouchTap={ () => menuItem.clickFunction(spec)}
          primaryText={menuItem.name}
          leftIcon={<FontIcon className="material-icons">{menuItem.icon}</FontIcon>}/>
      );
    });
  },
  
  render: function() {
    
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        maxHeight={272}
      >
        {this.getMenuItems()}
      </IconMenu>
    );
  }
});



module.exports = MenuComponent;