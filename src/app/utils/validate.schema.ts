import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Too Long!")
        .required("Password cannot be blank"),
    username: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Too Long!")
        .required("Username cannot be blank"),
});

export const SignUpSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Too Long!')
        .required('Password cannot be blank'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email cannot be blank'),
    username: Yup.string()
        .required('Name cannot be left blank'),
    phone: Yup.string()
        .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be valid')
        .required('Phone number cannot be blank'),
    fullName: Yup.string()
        .max(100, 'Full Name is too long')
        .required('Full Name cannot be blank'),

});

export const UpdateUserSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number cannot be blank")
      .matches(/^[0-9]+$/, "Phone number must be a number")
      .min(9, "Invalid phone number")
      .max(11, "Invalid phone number"),
    fullName: Yup.string()
      .max(100, "Full Name is too long")
      .required("Full Name cannot be blank"),
    username: Yup.string().required("Name cannot be left blank"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email cannot be blank"),
  });

export const UpdateUserPasswordScheme = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, "curren password need 6 character")
        .max(50, "current password maximum 50 character")
        .required("current password cannot blank"),
    newPassword: Yup.string()
        .min(6, "new password need 6 character")
        .max(50, "new password maximum 50 character")
        .required("new password cannot blank"),
    confirmNewPassword: Yup.string()
        .default("confirm password cannot be blank")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
        fullName: Yup.string()
        .max(100, 'Full Name is too long')
        .required('Full Name cannot be blank'),
});

export const RequestPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email cannot be blank"),
});

export const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password need 6 charactors")
        .max(50, "Password maximum 50 charactors")
        .required("Password cannot be blank"),
    confirmPassword: Yup.string()
        .required("Confirm Password cannot be blank")
        .oneOf([Yup.ref("password")], "Password must match"),
});
