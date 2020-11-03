import { formatISO } from 'date-fns';

export const UTC = {
  getDateString(): string {
    return formatISO(Date.now());
  },
};
