import { User } from "@/types/User";

export const validateUser = (
  user: User,
  existingUsers: User[],
  prev?: User
) => {
  const errors: any = {};

  if (!user.name?.first || user.name.first.trim().length === 0) {
    errors.name = { ...errors.name, first: "First name is required." };
  } else if (user.name.first.trim().length < 3) {
    errors.name = {
      ...errors.name,
      first: "First name must be at least 3 characters long.",
    };
  }

  if (!user.name?.last || user.name.last.trim().length === 0) {
    errors.name = { ...errors.name, last: "Last name is required." };
  } else if (user.name.last.trim().length < 3) {
    errors.name = {
      ...errors.name,
      last: "Last name must be at least 3 characters long.",
    };
  }

  if (!user.email || user.email.trim().length === 0) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
    errors.email = "Email must be a valid email address.";
  } else {
    const isEmailTaken = existingUsers.some(
      (existingUser) => existingUser.email === user.email
    );
    if (isEmailTaken && prev?.email !== user.email) {
      errors.email = "Email is already taken.";
    }
  }

  if (!user.location?.city || user.location.city.trim().length === 0) {
    errors.location = { ...errors.location, city: "City is required." };
  }

  if (!user.location?.country || user.location.country.trim().length === 0) {
    errors.location = { ...errors.location, country: "Country is required." };
  }

  return errors;
};
