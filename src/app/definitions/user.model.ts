/**
 * @file Stores the definition for the user interface,
 * which is used to provide typings for Users as they
 * are retrieved and added to the database
 * @author Luke Beach // lb580@kent.ac.uk
 */

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  customPhoto?: string;
  displayName?: string;
}
