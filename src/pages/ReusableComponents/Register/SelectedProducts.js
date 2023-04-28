import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import img from '~assets/images/product.png';
import CheckIcon from '@mui/icons-material/Check';
import ListItemIcon from '@mui/material/ListItemIcon';
import PropTypes from 'prop-types';

function SelectedProducts({ categories = [] }) {
    return (
        <>
            <List
                dense={true}
                sx={{
                    width: '100%',
                    // maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 }
                }}
                subheader={<li />}
            >
                {categories.map((category, index) => (
                    <li key={index}>
                        <ul>
                            <ListSubheader sx={{ fontWeight: 'bold' }}>{category?.name}</ListSubheader>
                            {category?.products.map((product, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon size="small">
                                        <CheckIcon size="small" sx={{ color: '#1bd7a0' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={product?.name} />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        </>
    );
}

SelectedProducts.propTypes = {
    categories: PropTypes.array.isRequired
};

export default SelectedProducts;
