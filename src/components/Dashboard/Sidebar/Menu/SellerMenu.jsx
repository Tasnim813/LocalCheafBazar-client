import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';
import MenuItem from './MenuItem';
import useStatus from '../../../../hooks/useStatus';

const SellerMenu = () => {
  const [status] = useStatus(); // 'active' | 'fraud'

  return (
    <>
      {/* Hide Create Meal if seller is fraud */}
      {status !== 'fraud' && (
        <MenuItem
          icon={BsFillHouseAddFill}
          label="Create Meal"
          address="create-meal"
        />
      )}

      <MenuItem icon={MdHomeWork} label="My Meals" address="my-meals" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Order Request"
        address="manage-orders"
      />
    </>
  );
};

export default SellerMenu;
