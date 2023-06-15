import React, { useState } from "react";
import {
    Badge,
    Button,
    ClickAwayListener,
    Grow,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    SvgIconProps,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

export interface IMenuItem {
    id: number;
    title: string;
    icon: React.FC<SvgIconProps>;
    count: number;
    color?: string;
    [key: string]: any;
}

interface TodoBurgerMenuProps {
    items: IMenuItem[];
    selectItem: IMenuItem;
    onSelectItem: (item: IMenuItem) => void;
    className?: string;
    iconsClassName?: string;
    popperClassName?: string;
}

const TodoBurgerMenu: React.FC<TodoBurgerMenuProps> = ({
    items, selectItem, onSelectItem, className, iconsClassName, popperClassName
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleSelect = (item: IMenuItem) => {
        setOpen(false);
        onSelectItem(item);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement))
            return;
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    const handleToggleMenu = (event: any) => {
        setOpen(prev => !prev);
    }

    return (
        <>
            <Button
                ref={anchorRef}
                className={className}
                onClick={handleToggleMenu}
            >
                {open ? (
                    <Close className={iconsClassName} />
                ) : (
                    <Menu className={iconsClassName} />
                )}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1000 }}
                className={popperClassName}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ padding: 0 }}
                                >
                                    {items.map(item => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={() => handleSelect(item)}
                                            selected={item.id === selectItem.id}
                                            sx={{ padding: "15px 10px 7px 10px" }}
                                        >
                                            <ListItemIcon>
                                                <Badge
                                                    badgeContent={item.count}
                                                    color={item.color as any}
                                                    showZero
                                                >
                                                    <item.icon sx={{ transform: "scale(1)" }} />
                                                </Badge>
                                            </ListItemIcon>
                                            <ListItemText
                                                sx={{ ml: 1, mb: "6px !important" }}
                                                primary={item.title}
                                            />
                                        </MenuItem>
                                    )
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default TodoBurgerMenu;
