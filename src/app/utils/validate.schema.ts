import *as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Too Long!')
        .required('Password cannot be blank'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email cannot be blank'),
});

export const SignUpSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Too Long!')
        .required('Password cannot be blank'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email cannot be blank'),
    name: Yup.string()
        .required('Name cannot be left blank'),
});

export const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
        .required('Họ tên không được để trống'),
    phone: Yup.string()
        .required('Số điện thoại không được để trống'),
});

export const UpdateUserPasswordScheme= Yup.object().shape({
    currentPassword: Yup.string()
    .min(6,'curren password need 6 character')
    .max(50,'current password maximum 50 character')
    .required('current password cannot blank'),
    newPassword:Yup.string()
    .min(6,'new password need 6 character')
    .max(50,'new password maximum 50 character')
    .required('new password cannot blank'),
    confirmNewPassword:Yup.string()
    .default('confirm password cannot be blank')
    .oneOf([Yup.ref('newPassword')],'Passwords must match')
})