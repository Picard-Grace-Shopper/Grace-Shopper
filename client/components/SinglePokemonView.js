import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

function SinglePokemonView() {
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      await axios
        .get(`/api/products/${id}`)
        .then((res) => {
          setPokemon(res.data);
        })
        .catch((err) => {
          console.err(err);
        });
    };
    fetchData(id);
  }, [id]);



  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const [quantity, setQuantity] = useState(1);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);

  // };
  // const handleClose= (event) => {
  //   setAnchorEl(null);
  //   setQuantity(event.quantity)

  // };



  return (
    <div>
      <div key={pokemon.id}>
        <img src={pokemon.imageUrl} />
        <p> Name: {pokemon.pokemon_name} </p>
        <p> Type: {pokemon.type} </p>
        <p> Price: {pokemon.price} </p>
        <p> Description: {pokemon.description} </p>
        <p> Quantity: {pokemon.quantity}</p>
      </div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Quantity: {quantity}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        value={quantity}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} quantity={1}>1</MenuItem>
        <MenuItem onClick={handleClose} quantity={2}>2</MenuItem>
        <MenuItem onClick={handleClose} quantity={3}>3</MenuItem>
      </Menu> */}

      <button className="addToCart">Add to Cart | Only {pokemon.quantity} Available</button>
    </div>
  );
}

export default SinglePokemonView;
