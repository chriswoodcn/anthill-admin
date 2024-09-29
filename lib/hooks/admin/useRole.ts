import { RootState, useAppSelector } from '@/store';
import { useState } from 'react';
import useEffectOnce from '../useEffectOnce';

export default function () {
  const userInfo = useAppSelector(
    (state: RootState) => state.adminUser.userInfo
  );
  const [isRoleSuperAdmin, setIsRoleSuperAdmin] = useState<boolean>(userInfo.affiliateFlag == '0' && userInfo.adminFlag == '1')
  const [isRoleSuper, setIsRoleSuper] = useState<boolean>(userInfo.affiliateFlag == '0' && userInfo.adminFlag == '0')
  const [isRoleMaintainAdmin, setIsRoleMaintainAdmin] = useState<boolean>(userInfo.affiliateFlag == '1' && userInfo.adminFlag == '1')
  const [isRoleMaintain, setIsRoleMaintain] = useState<boolean>(userInfo.affiliateFlag == '1' && userInfo.adminFlag == '0')
  const [isRoleSysuserAdmin, setIsRoleSysuserAdmin] = useState<boolean>(userInfo.affiliateFlag == '2' && userInfo.adminFlag == '1')
  const [isRoleSysuser, setIsRoleSysuser] = useState<boolean>(userInfo.affiliateFlag == '2' && userInfo.adminFlag == '0')

  useEffectOnce(() => {
    setIsRoleSuperAdmin(userInfo.affiliateFlag == '0' && userInfo.adminFlag == '1')
    setIsRoleSuper(userInfo.affiliateFlag == '0' && userInfo.adminFlag == '0')
    setIsRoleMaintainAdmin(userInfo.affiliateFlag == '1' && userInfo.adminFlag == '1')
    setIsRoleMaintain(userInfo.affiliateFlag == '1' && userInfo.adminFlag == '0')
    setIsRoleSysuserAdmin(userInfo.affiliateFlag == '2' && userInfo.adminFlag == '1')
    setIsRoleSysuser(userInfo.affiliateFlag == '2' && userInfo.adminFlag == '0')
  }, [userInfo])

  return {
    isRoleSuperAdmin,
    isRoleSuper,
    isRoleMaintainAdmin,
    isRoleMaintain,
    isRoleSysuserAdmin,
    isRoleSysuser
  }
}
