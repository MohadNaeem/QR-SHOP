import { Badge, useMediaQuery } from "@mui/material"
import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNavigate } from "react-router-dom"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { useSelector } from "react-redux"
// import { useUserAuthContext } from "../../firebase/AuthContext";

const drawerWidth = 240

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}))

export const MenuBarComponent = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
//   const { user, logOut } = useUserAuthContext()

  const user = null
  const logout = () => {}

  const handleContactClick = () => {
    const mailToUrl = "mailto:hello@qrlab.com"
    window.location.href = mailToUrl
  }
  const onNavigate = (link) => {
    if (link === "home") {
      navigate(`/`)
      return
    }
    if (link === "terms of service and privacy policy") {
      navigate(`/policy/privacy`)
      return
    }
    if (link === "contact") {
      return
    }
    navigate(`${link}`)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
//   const { cartItems } = useSelector((state) => state.cart)
  const cartItemCount = 5

  return window.innerWidth < 600 ? (
    <>
      <div
        className="flex justify-between flex-row align-center p-2 pt-0 w-100 max-md:px-8"
        style={{ width: "100%", alignItems: "center" }}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/add7a68229a1370bbb2dbebfc05d06e6deb09974b40533a0d01f1f329f133357?apiKey=599dc50b3d834ed59f450af622cca86d&"
          className="object-center aspect-square fill-indigo-500 w-[41px]"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-5">
          <Badge badgeContent={cartItemCount} color="primary" invisible={!cartItemCount}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ee0c5807c9fc36a59cac02a3ef71739d0eb1a1c1d1a77fa557ed6e4d8524e9e?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-center self-stretch aspect-square fill-slate-600 w-[25px] cursor-pointer"
              onClick={() => navigate("/cart")}
            />
          </Badge>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            style={{ height: "35px", width: "35px" }}
            onClick={handleDrawerOpen}
            sx={{
              ...(open && { display: "none" }),
              //   height: "45px !important",
              //   width: "45px !important",
            }}
          >
            <MenuIcon style={{ height: "35px", width: "35px" }} />
          </IconButton>
        </div>
      </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon style={{ height: "35px", width: "35px" }} />
            ) : (
              <ChevronRightIcon style={{ height: "35px", width: "35px" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Products", "Contact", "About", "Terms of Service and Privacy Policy"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (text === "Contact") {
                    handleContactClick()
                  } else {
                    onNavigate(text.toLowerCase)
                  }
                }}
              >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <div className="flex align-center justify-center mt-3">
          <div
            onClick={() => {
              if (user?.uid) {
                navigate("/dashboard")
              } else {
                navigate("/login")
              }
            }}
            className="cursor-pointer flex gap-3 align-center items-stretch self-stretch px-12 py-2 bg-indigo-500 rounded-[30px] w-[180px]"
          >
            <div
              className="grow ps-1"
              style={{
                color: "white",
              }}
            >
              {user?.uid ? "Dashboard" : "Log In"}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/de03ea19b855a7a8c87b1937190b82fc46e958cf8fc463a8a1964841dbac93e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-center my-auto aspect-[0.71] stroke-[1.667px] stroke-white w-[5px]"
            />
          </div>
        </div>
        <div className="flex align-center justify-center mt-3">
          {user?.uid && (
            <div
              onClick={() => {
                logOut()
                navigate("/login")
              }}
              style={{
                color: "white",
              }}
              className="cursor-pointer flex gap-3 align-center items-stretch self-stretch px-12 py-2 bg-indigo-500 rounded-[30px] w-[180px]"
            >
              <div className="grow ps-1">Log Out</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/de03ea19b855a7a8c87b1937190b82fc46e958cf8fc463a8a1964841dbac93e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="object-center my-auto aspect-[0.71] stroke-[1.667px] stroke-white w-[5px]"
              />
            </div>
          )}
        </div>
      </Drawer>
    </>
  ) : (
    <div className="flex gap-5 justify-between items-stretch w-full text-base tracking-wide leading-4 text-center whitespace-nowrap max-w-[1139px] max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-5 justify-between items-stretch font-medium text-slate-600 max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/add7a68229a1370bbb2dbebfc05d06e6deb09974b40533a0d01f1f329f133357?apiKey=599dc50b3d834ed59f450af622cca86d&"
          className="object-center aspect-square fill-indigo-500 w-[41px]"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-5 justify-between items-stretch pr-5 my-auto">
          <div className="cursor-pointer" onClick={() => onNavigate("/")}>
            Home
          </div>
          <div className="cursor-pointer" onClick={() => onNavigate("/products")}>
            Products
          </div>
          <div className="cursor-pointer" onClick={() => handleContactClick()}>
            Contact
          </div>
          <div className="cursor-pointer" onClick={() => onNavigate("about")}>
            About
          </div>
          <div className="cursor-pointer" onClick={() => onNavigate("/policy/privacy")}>
            Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between items-center px-5 my-auto font-bold text-white">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f694bdc4938622f5fe56ce1435fc19e89524907da5805818011a422b1b149579?apiKey=599dc50b3d834ed59f450af622cca86d&"
          className="object-center self-stretch my-auto aspect-square fill-slate-600 w-[25px]"
        />
        <Badge badgeContent={cartItemCount} color="primary" invisible={!cartItemCount}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ee0c5807c9fc36a59cac02a3ef71739d0eb1a1c1d1a77fa557ed6e4d8524e9e?apiKey=599dc50b3d834ed59f450af622cca86d&"
            className="object-center self-stretch my-auto aspect-square fill-slate-600 w-[25px] cursor-pointer"
            onClick={() => navigate("/cart")}
          />
        </Badge>
        <div className="flex align-center justify-center">
          <div
            onClick={() => {
              if (user?.uid) {
                navigate("/dashboard")
              } else {
                navigate("/login")
              }
            }}
            className="cursor-pointer flex gap-3 align-center items-stretch self-stretch px-4 py-2 bg-indigo-500 rounded-[30px]"
          >
            <div
              className="grow ps-1"
              style={{
                color: "white",
              }}
            >
              {user?.uid ? "Dashboard" : "Log In"}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/de03ea19b855a7a8c87b1937190b82fc46e958cf8fc463a8a1964841dbac93e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-center my-auto aspect-[0.71] stroke-[1.667px] stroke-white w-[5px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
