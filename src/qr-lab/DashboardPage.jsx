import * as React from "react"
import { useUserAuthContext } from "./context/AuthContext"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { DataGrid } from "@material-ui/data-grid"
import { Box, Button, Chip, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { Modal } from "@material-ui/core"
import { MenuBarComponent } from "./components/MenuBarComponent"
import { useNavigate } from "react-router-dom"
import { API_URL } from "./QRShop"

export function DashboardComponent(props) {
  const { user, logOut } = useUserAuthContext()
  const [ordersData, setOrdersData] = React.useState([])
  const [viewOrder, setViewOrder] = useState()
  const smUp = useMediaQuery("(max-width : 650px)")
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const db = getFirestore()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: smUp ? "100%" : 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }
  const getOrderDetails = async (data) => {
    let dataResult = []
    let count = data.length
    try {
      await data.forEach((order) => {
        fetch(`${API_URL}/order-details?id=${order?.orderId}`)
          .then((res) => res.json())
          .then(({ result }) => {
            dataResult.push({
              ...order,
              order: result,
              id: order?.orderId,
              name: result?.items[0] ? result?.items[0]?.name : "",
              status: result?.status,
              shipping: result?.shipping,
              cost: result.costs?.total,
            })
            count--
            if (count === 0) {
              setOrdersData([...dataResult])
            }
          })
      })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPost = async () => {
    await getDocs(collection(db, "Orders")).then((querySnapshot) => {
      const possibleDocs = []
      const data = querySnapshot.docs.map((doc) => {
        if (doc.data().userId === user?.uid) {
          possibleDocs.push({ ...doc.data() })
        }
      })
      getOrderDetails(possibleDocs)
    })
  }
  React.useEffect(() => {
    fetchPost()
  }, [])

  const columns = [
    {
      field: "orderId",
      headerName: "Order ID",
      minWidth: 130,
      flex: 0.3,
      headerClassName: "column-header",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 0.5,
      magin: "0 auto",
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 20,
      flex: 0.3,
      headerClassName: "column-header hide-on-mobile",
      renderCell: (params) => {
        const value = params.getValue(params.id, "status")
        return (
          <>
            <Chip
              sx={{ width: "110px", textAlign: "center" }}
              label={value?.toUpperCase()}
              color={value === "fulfilled" ? "success" : "warning"}
            />
          </>
        )
      },
    },
    {
      field: "shipping",
      headerName: "Shipping",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "cost",
      headerName: "Price",
      type: "number",
      minWidth: 80,
      flex: 0.3,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      minWidth: 130,
      headerClassName: "column-header1",
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                const value = params.getValue(params.id, "id")
                setViewOrder(ordersData.filter((order) => order.id === value)[0])
                setOpen(true)
              }}
            >
              View Details
            </Button>
          </>
        )
      },
    },
  ]
  return (
    <div className="pr-14 bg-slate-200 rounded-[50px] max-md:pr-5" style={{ minHeight: "100vh" }}>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        {!smUp ? (
          <div className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full" style={{ minHeight: "100vh" }}>
            <div className="cursor-pointer flex flex-col grow items-center pt-1 pb-12 pl-5 mx-auto w-full text-xl font-medium bg-white shadow-2xl rounded-[50px_0px_0px_50px] text-sky-950 max-md:mt-10">
              <div className="self-end w-px h-5" />
              <div
                className="flex gap-1 justify-between mt-4 text-3xl font-semibold whitespace-nowrap"
                onClick={() => navigate("/")}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8872bab124cef618655f3d5696c8e1db43985d78cffa87511b08508cfd1ebe4b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="self-start aspect-[1.11] fill-slate-200 w-[42px]"
                />
                <div className="grow">QR Lab</div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e2c8b5386ebb7d27fc0bb9c0089b0385736a5db31eeea667b2805597a4cf29?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="mt-6 max-w-full aspect-[100] stroke-[1px] stroke-gray-200 w-[164px]"
              />
              <div className="flex gap-2.5 justify-between mt-14 ml-3 max-w-full text-indigo-500 w-[198px] max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/738f9798e037e0cd67e194398495c079bc0e43ceacbcc8bb1f5760e48c909279?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="my-auto w-5 aspect-square fill-indigo-500"
                />
                <div className="flex-auto">Dashboard</div>
              </div>
              <div
                className="flex flex-col items-center self-stretch pt-7 me-4 mt-12 tracking-wide whitespace-nowrap rounded-2xl bg-sky-950 text-slate-50"
                style={{
                  marginTop: "25vh",
                }}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b289dd01550f92cc78b2bd5d4f32f49eb8dbdf092ccef908d7909474457038bb?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="aspect-square w-[72px]"
                />
                <div className="mt-3.5 mb-3.5">QR Lab Shop</div>
                <div
                  onClick={() => {
                    logOut()
                    navigate("/")
                  }}
                  className="cursor-pointer flex gap-1 justify-between items-stretch self-stretch px-10 pe-6 py-2 bg-indigo-500 rounded-[20px]"
                  style={{
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  <div className="grow ms-1" style={{ color: "white" }}>
                    Log Out
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/de03ea19b855a7a8c87b1937190b82fc46e958cf8fc463a8a1964841dbac93e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="me-3 object-center my-auto aspect-[0.71] stroke-[1.667px] stroke-white w-[5px]"
                  />
                </div>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/908fa24fb971c502b7aba70dc49b2d1c753874a8c0b638655da5692196c728b8?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="self-stretch mt-5 w-full aspect-[2.04]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <MenuBarComponent />
          </div>
        )}
        <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-5 justify-between max-md:flex-wrap max-w-full">
                {!smUp ? (
                  <div className="flex flex-col flex-1 justify-between my-auto text-sky-950">
                    <div className="text-3xl font-medium whitespace-nowrap">Hello {user?.displayName}</div>
                    <div className="mt-1.5 text-sm font-light">14:00 30 Jan 2024</div>
                  </div>
                ) : (
                  <div className="flex justify-between my-auto text-sky-950 px-4" style={{ width: "100%" }}>
                    <div>
                      <div className="text-3xl font-medium whitespace-nowrap">Hello {user?.displayName}</div>
                      <div className="mt-1.5 text-sm font-light">14:00 30 Jan 2024</div>
                    </div>
                    <div className="ms-7">
                      <img loading="lazy" src={user?.photoURL} className="aspect-square w-[60px]" />
                    </div>
                  </div>
                )}

                {/* <div
                  style={{
                    width: "300px",
                  }}
                  className="flex gap-2.5 justify-between px-3.5 py-5 text-lg font-medium capitalize whitespace-nowrap bg-white rounded-xl border border-solid shadow-sm border-zinc-300 text-slate-400"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f0c3c32843e28a751b04147037a00ab3f52c06b2687dd94920662b274dc88b9?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="w-5 aspect-square"
                  />
                  <div className="flex-auto self-start mt-1.5">Search</div>
                </div> */}
              </div>
              {!smUp && (
                <div className="flex gap-4 justify-between text-base font-medium text-sky-950">
                  <img loading="lazy" src={user?.photoURL} className="aspect-square w-[60px]" />
                </div>
              )}
            </div>
            <div className="justify-between mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                  <div
                    className="flex flex-col grow justify-center px-20 py-7 w-full whitespace-nowrap bg-white rounded-2xl text-sky-950 max-md:px-5 max-md:mt-10"
                    style={{ alignItems: "center" }}
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/03019a6135725fad4e4806efdafe2e9f5f76b248aa84ffbe2484e7762ed54314?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="self-center aspect-square w-[47px]"
                    />
                    <div className="mt-2 text-5xl max-md:text-4xl">{ordersData.length || 0}</div>
                    <div className="mt-2 text-base font-medium">Total Orders</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div
                    style={{ alignItems: "center" }}
                    className="flex flex-col grow justify-center items-center px-14 py-7 w-full whitespace-nowrap bg-white rounded-2xl text-sky-950 max-md:px-5 max-md:mt-10"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/083fec50fe55690f4489fcd4871f377eb9d73173e8e72d91db002265590c95fc?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="aspect-square w-[47px]"
                    />
                    <div className="mt-2 text-5xl max-md:text-4xl">
                      {ordersData.filter((order) => order.status === "fulfilled").length || 0}
                    </div>
                    <div className="self-stretch mt-2 text-center font-medium">Fulfilled Orders</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div
                    style={{ alignItems: "center" }}
                    className="flex flex-col grow justify-center items-center px-16 py-7 w-full whitespace-nowrap bg-white rounded-2xl text-sky-950 max-md:px-5 max-md:mt-10"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/368fb24618277cc7c770de3223f41f44f30aae10bfb4c8c64bb7da48b0d5b562?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="aspect-square w-[47px]"
                    />
                    <div className="mt-2 text-5xl max-md:text-4xl">
                      {ordersData.filter((order) => order.status === "draft").length || 0}
                    </div>
                    <div className="self-stretch mt-2 text-center font-medium">Draft Orders</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div
                    style={{ alignItems: "center" }}
                    className="flex flex-col grow justify-center px-11 py-7 w-full whitespace-nowrap bg-white rounded-2xl text-sky-950 max-md:px-5 max-md:mt-10"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2b9b916a0b9254c220e901763eb7936784f4feb0f92af5c7b9cd79f19a7471b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="self-center aspect-square w-[47px]"
                    />
                    <div className="mt-2 text-5xl max-md:text-4xl">$8.2</div>
                    <div className="mt-2 text-center font-medium">Avg Order Cost</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-8 pt-10 pb-6 mt-12 bg-white rounded-2xl text-slate-600 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              {/* <div className="flex gap-5 justify-between text-3xl font-bold max-md:flex-wrap max-md:max-w-full">
                <div>Name</div>
                <div className="flex-auto">Position</div>
                <div className="flex-auto">Status</div>
                <div className="flex-auto">Waiting Time</div>
                <div>Time</div>
                <div className="grow">Action</div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8c4941949350eb8ec817bd1f78f43b2f087474c03260cebace31cdad0608e8c?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="mt-6 w-full stroke-[1px] stroke-gray-200 max-md:max-w-full"
              />
              <div className="flex gap-5 justify-between items-start pr-7 mt-2.5 text-3xl font-medium max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <div className="mt-4">Junaid</div>
                <div className="mt-4">1</div>
                <div className="grow justify-center self-stretch px-9 py-1.5 text-2xl font-semibold text-white whitespace-nowrap bg-green-600 rounded-xl max-md:px-5">
                  Served
                </div>
                <div className="mt-4">0 min</div>
                <div className="mt-4">09:45</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/44efb45a32eeac22bcfa00bc1443335a349c0681286a03200539be563c455358?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="self-stretch w-10 aspect-square"
                />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8c4941949350eb8ec817bd1f78f43b2f087474c03260cebace31cdad0608e8c?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="mt-5 w-full stroke-[1px] stroke-gray-200 max-md:max-w-full"
              /> */}
              <div className="flex gap-2 mb-3 justify-between text-3xl font-bold max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto">Orders</div>
              </div>
              <DataGrid
                rows={ordersData}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-2xl font-bold text-slate-600 max-md:max-w-full">Order Details</div>
            <div className="flex gap-5 justify-between items-stretch pr-4 mt-8 w-full text-slate-600 max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-5 justify-between items-stretch">
                <img
                  loading="lazy"
                  // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  src={viewOrder?.order?.items[0]?.files[0]?.preview_url}
                  className="object-center w-[150px]"
                />
                <div className="flex flex-col flex-1 items-stretch my-auto">
                  <div className="text-base font-bold">{viewOrder?.name}</div>
                  <div className="mt-5 text-sm font-medium">Quantity: ( 1 )</div>
                </div>
              </div>
              <div className="flex flex-col items-stretch my-auto font-bold">
                <div className="text-base">Total</div>
                <div className="mt-5 text-2xl">${viewOrder?.cost} </div>
              </div>
            </div>
            <div className="shrink-0 mt-9 h-px bg-neutral-200 max-md:max-w-full" />
            <div className="mt-4 text-2xl font-bold text-slate-600 max-md:max-w-full">Delivery Address</div>
            <div className="mt-4 ml-2.5 text-base font-medium text-slate-600">
              {viewOrder?.order?.recipient?.address1}, {viewOrder?.order?.recipient?.city},{" "}
              {viewOrder?.recipient?.order?.country_name}
            </div>
            {viewOrder?.order?.shipments[0] ? (
              <>
                <div className="mt-4 text-2xl font-bold text-slate-600 max-md:max-w-full">Shipment Tracking</div>
                <div className="mt-4 ml-2.5 text-base font-medium text-slate-600">
                  {viewOrder?.orders?.shipments[0]?.service}
                </div>
                <div className="mt-2 ml-2.5 text-base font-medium text-slate-600">
                  Tracking Number - {viewOrder?.order?.shipments[0]?.tracking_number}
                </div>
                <div className="mt-2 ml-2.5 text-base font-medium text-slate-600">
                  <Button onClick={() => window.location.replace(`${viewOrder?.order?.shipments[0]?.tracking_url}`)}>
                    Track Order
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  )
}
