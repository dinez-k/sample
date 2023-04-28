import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Box, Stack, IconButton, Avatar, FormControlLabel } from '@mui/material/index';
import img from '~assets/images/product.png';
import { useState, useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import { useAxios } from '~/components/useAxios';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

function ProductSelection({ checkedValues = [], setCheckedValues, categories = [] }) {
    const [expanded, setExpanded] = React.useState(false);
    const { colors, fonts } = useContext(ThemeContext);
    const [filterArr, setfilterArr] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setfilterArr(categories);
    }, [categories]);

    const handleProductChange = (event) => {
        const id = event.target.id;
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckedValues([...checkedValues, id]);
        } else {
            setCheckedValues(checkedValues.filter((value) => value !== id));
        }
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setProducts(categories.find((e) => e?.id === panel)?.products);
        setExpanded(isExpanded ? panel : false);
    };

    function handleSearch(event) {
        let filter = categories.filter((category) => category?.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setfilterArr(filter);
    }

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TextField label="Search Products" fullWidth margin="normal" onChange={handleSearch} variant="outlined" size="small" />
            <div style={{ height: '40vh', overflow: 'auto', padding: '10px', justifyContent: 'center' }}>
                <Typography sx={{ display: filterArr.length === 0 ? 'block' : 'none' }}>No Record Found !</Typography>
                {filterArr.map((category, index) => {
                    return (
                        <Accordion
                            key={index}
                            expanded={expanded === category?.id}
                            onChange={handleChange(category.id)}
                            sx={{
                                boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
                                margin: 'auto  !important'
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                <Stack flexDirection="row" justifyContent="center" alignItems="center">
                                    <Avatar src={img} varient="square" alt="ico"></Avatar>
                                    <Typography>{category?.name}</Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack paddingLeft="10px">
                                    {products.map((product, index) => {
                                        return (
                                            <Stack key={index} flexDirection="row" justifyContent="space-between">
                                                <Typography sx={{ textOverflow: 'word-wrap', width: '95%' }}>{product?.name}</Typography>
                                                <Checkbox
                                                    id={product?.id}
                                                    checked={checkedValues.includes(product?.id)}
                                                    onChange={handleProductChange}
                                                    sx={{
                                                        color: colors.secondary,
                                                        '&.Mui-checked': {
                                                            color: colors.secondary
                                                        }
                                                    }}
                                                    size="small"
                                                />
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
        </div>
    );
}

ProductSelection.propTypes = {
    checkedValues: PropTypes.array.isRequired,
    setCheckedValues: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
};

export default ProductSelection;
