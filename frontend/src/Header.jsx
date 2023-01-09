import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header>
            <div className='w-screen flex flex-row justify-between px-10 md:px-64'>
                <div className='flex flex-row m-0 md:m-6 gap-4 items-center'>
                    <div id='company' className="font-['DelaGothicOne'] md:text-[1.5rem] font-normal text-sm">GlobalTalk</div>
                    <div id='divider' className='w-[1px] h-[80%] bg-black'></div>
                    <div id='buttons'>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Dashboard
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>

                    </div>
                </div>
                <div className='flex m-6 items-center'>
                    <button id='user'>Login</button>
                </div>
            </div>
        </header>
    )
}

export default Header