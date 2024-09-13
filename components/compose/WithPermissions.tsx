"use client";

import { RootState } from "@/store";
import { FC, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const enum WithType {
  AND,
  OR,
}
interface PermissionsOptions {
  permissions: string[];
  type?: WithType;
  children: ReactNode;
}
const PERMISSION_ADMIN = "*:*:*";
export const WithPermissions: FC<PermissionsOptions> = (
  props: PermissionsOptions
) => {
  const { permissions, type = WithType.AND, children } = props;
  const userPermissions = useSelector(
    (state: RootState) => state.adminUser.permissions
  );
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    if (permissions && userPermissions.length > 0) {
      if (type == WithType.AND) {
        setHasPermission(
          permissions.every((permi) => {
            return (
              userPermissions.includes(PERMISSION_ADMIN) || userPermissions.includes(permi)
            );
          })
        );
      }
      if (type == WithType.OR) {
        setHasPermission(
          permissions.some((permi) => {
            return (
              userPermissions.includes(PERMISSION_ADMIN) || userPermissions.includes(permi)
            );
          })
        );
      }
    }
  }, [permissions]);

  return <>{hasPermission && children}</>;
};
interface RolesOptions {
  roles: string[];
  type?: WithType;
  children: ReactNode;
}
export const WithRoles: FC<RolesOptions> = (props: RolesOptions) => {
  const { roles, type = WithType.AND, children } = props;
  const userRoles = useSelector((state: RootState) => state.adminUser.roles);
  const [hasRole, setHasRole] = useState(false);
  useEffect(() => {
    if (roles && userRoles.length > 0) {
      if (type == WithType.AND) {
        setHasRole(roles.every((r) => userRoles.includes(r)));
      }
      if (type == WithType.OR) {
        setHasRole(roles.some((r) => userRoles.includes(r)));
      }
    }
  }, [roles]);

  return <>{hasRole && children}</>;
};
