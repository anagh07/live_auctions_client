import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Files
import image from '../images/contemplative-reptile.jpg';

export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' src={image} alt='green iguana' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.ad.productName}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Price: $ {props.ad.currentPrice.$numberDecimal}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Enter auction</Button>
      </CardActions>
    </Card>
  );
}
