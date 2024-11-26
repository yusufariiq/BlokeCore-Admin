import React from 'react'
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <div className="">
        <img
            alt=""
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=red&shade=600"
            className="h-6 sm:h-8 w-auto"
        />
        <Button variant="contained" color="warning">
            Log Out
        </Button>
    </div>
  )
}

export default Navbar