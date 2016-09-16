require('./menu.scss');

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const MenuComponent = ({menuOptions, spec}) => {
  
  const getMenuItems = () => {
    let opts;
    if(spec.bookmarked){
      opts = _.reject(menuOptions, {name: 'bookmark'});
    } else {
      opts = _.reject(menuOptions, {name: 'unbookmark'});
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
  };
  
  return (
    <div className="row spec-menu">
      <IconMenu
        className='menu'
        iconButtonElement={<IconButton className='menu-button'><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        maxHeight={272}
      >
        {getMenuItems()}
      </IconMenu>
    </div>
  );
};



module.exports = MenuComponent;