const CustomInput = ({ name, label, ...rest }) => {
    const { values, handleChange, errors, touched } = useFormikContext();

    return (
        <>
            <TextField
                label={label}
                name={name}
                value={values[name]}
                onChange={handleChange}
                error={touched[name] && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
                {...rest}
            />
        </>
    );
};
