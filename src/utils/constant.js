export const STATUS_USER = {
  NEW: 'NEW',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  WARNING: 'WARNING',
};

export const SELECT_STATUS_USER = Object.keys(STATUS_USER).map((key) => ({ 
  key: key,
  name: STATUS_USER[key]
 }));
export const COLOR_BADGE = {
  FAIL: 'danger',
  ACTIVE: 'info',
  INACTIVE: 'secondary',
};

export const ROW_PER_PAGE = 12;