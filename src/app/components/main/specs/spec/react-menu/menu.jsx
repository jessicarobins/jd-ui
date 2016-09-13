import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

var MenuComponent = React.createClass ({
  handleMenuClick: function(item) {
    item.clickFunction(this.props.spec);
  },
  
  getMenuItems: function() {
    const spec = this.props.spec;
    return this.props.menuOptions.map(function(menuItem){
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
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        {this.getMenuItems()}
      </IconMenu>
    );
  }
});



module.exports = MenuComponent;