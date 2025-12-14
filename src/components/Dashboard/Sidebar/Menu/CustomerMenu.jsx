import { BsFingerprint, BsHeart, BsStar } from 'react-icons/bs';
import MenuItem from './MenuItem';
import useStatus from '../../../../hooks/useStatus';

const CustomerMenu = () => {
  

  return (
    <>
      {/* My Orders – hidden if user is fraud */}
    
        <MenuItem
          icon={BsFingerprint}
          label="My Orders"
          address="my-orders"
        />
      

      {/* Favorite Meal – Always visible */}
      <MenuItem
        icon={BsHeart}
        label="Favorite Meal"
        address="favorite-meal"
      />

      {/* My Review – Always visible */}
      <MenuItem
        icon={BsStar}
        label="My Review"
        address="my-review"
      />
    </>
  );
};

export default CustomerMenu;
