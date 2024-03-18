import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import { dispalyMoney } from "./DisplayMoney"
import { useScreenshot } from "use-react-screenshot"
import { storage } from "../firebase/firebase"
import { nanoid } from "nanoid"
import { useEditor, useFrame } from "@layerhub-io/react"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import useDesignEditorContext from "../../hooks/useDesignEditorContext.ts"
import { getDefaultTemplate } from "../../constants/design-editor.ts"

const useStyles = makeStyles((theme) => ({
  roots11: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 2rem",
    width: "80%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    [theme.breakpoints.down(899)]: {
      padding: "3rem 3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },
    [theme.breakpoints.down(499)]: {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  root11: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1rem",
    width: "80%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",
    minHeight: "250px",
    [theme.breakpoints.down(899)]: {
      padding: "3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },

    [theme.breakpoints.down(499)]: {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  media: {
    width: "300px",
    height: "240px",
    marginRight: "16px",

    [theme.breakpoints.down(699)]: {
      with: "35%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(599)]: {
      with: "30%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(499)]: {
      with: "20%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "fit-content",

    [theme.breakpoints.down(699)]: {
      padding: "0",
      width: "fit-content",
    },
    [theme.breakpoints.down(599)]: {
      padding: "0",
      width: "fit-content",
    },
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  title: {
    width: "90%",
    fontSize: "1rem",
    fontWeight: 600,
    marginLeft: "1rem",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
      marginLeft: "0",
    },
    "& .MuiTypography-subtitle1 ": {
      [theme.breakpoints.down(599)]: {
        fontSize: "14px",
      },
    },
  },

  cartDeleteIcon: {
    color: "black",
    marginTop: "-.5rem",

    [theme.breakpoints.down(599)]: {
      marginRight: "-2.5rem",
    },
    "&:hover": {
      color: "#ed1c24",
    },
    [theme.breakpoints.down(499)]: {
      marginRight: "-2rem",
    },
  },

  priceItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    marginLeft: "1.2rem",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
  },

  cartSubHeadings: {
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#414141",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: 400,
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "13px",
    },
  },
  itemOldPrice: {
    marginLeft: "-8px",
    fontSize: "14px",
    fontWeight: 400,

    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },

  contentBottom: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "baseline",
    width: "fit-content",
    flexDirection: "column",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    [theme.breakpoints.down(550)]: {
      position: "relative",
      marginLeft: "0rem",
    },
  },
}))

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

function CartItem({ deleteCartItems, item, decreaseQuantity, increaseQuantity, setUrl, setIsLoading, length }) {
  const classes = useStyles()
  const fileRef = useRef()
  const picRef = useRef()
  const alert = useAlert()
  const editor = useEditor()
  const navigate = useNavigate()
  let finalPrice = item.price
  const [file, setFile] = useState({})
  const [imageOfSs, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 3.0,
  })
  const getImage = () => takeScreenshot(picRef.current)
  const { currentDesign, setCurrentDesign } = useDesignEditorContext()
  let discountedPrice = parseFloat(item.price) + 2
  discountedPrice = dispalyMoney(discountedPrice)
  let total = finalPrice * 1
  total = dispalyMoney(total)
  finalPrice = dispalyMoney(finalPrice)
  const uploadFile = () => {
    setIsLoading(true)
    const fileName = new Date().getTime()
    const imageRef = storageRef(storage, `products/${fileName}`)
    var fileToUpload = dataURLtoFile(imageOfSs, fileName)
    uploadBytes(imageRef, fileToUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setUrl(url)
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setIsLoading(false)
            alert.error("Unexpected error occured.")
          })
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }
  console.log(currentDesign)
  const onFileUpload = (e) => {
    const fileToUpload = {}
    fileToUpload.image = URL.createObjectURL(e.target.files[0])
    fileToUpload.file = e.target.files[0]
    setFile(fileToUpload)
    setIsLoading(true)
    setTimeout(() => {
      getImage()
    }, 2000)
  }

  useEffect(() => {
    if (imageOfSs !== null) {
      uploadFile()
    }
  }, [imageOfSs])

  return (
    <>
      <div>
        <img
          loading="lazy"
          // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c370855e2722b23634b9a82aab853076d2c9a348cb2944f4f7c59ebe1a3f956?apiKey=599dc50b3d834ed59f450af622cca86d&"
          src={imageOfSs || item?.image}
          className="object-center mt-8 w-full max-md:mr-1 max-md:ml-0.5"
          style={
            {
              // transform: !file.image && "scaleX(1.5)",
            }
          }
        />
        <div className="flex gap-5 justify-between items-stretch pr-2.5 mt-8 text-2xl max-md:mr-1 max-md:ml-0.5">
          <div className="flex-auto">{item?.name}</div>
          <img
            onClick={() => deleteCartItems(item?.id)}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/495ac8e2a0be1254e984e211e8b56c28f30d9413686adf0e821937f9dffe6aab?apiKey=599dc50b3d834ed59f450af622cca86d&"
            className="cursor-pointer object-center my-auto w-5 aspect-square"
          />
        </div>
        {file?.file && (
          <p className="mt-5">
            File : <span style={{ color: "red" }}>{file?.file?.name}</span>
          </p>
        )}
        <div
          className="cursor-pointer flex flex-col justify-center items-center self-center px-8 py-4 mt-8 max-w-full text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px]  max-md:px-5"
          onClick={() => fileRef?.current?.click()}
        >
          <div className="flex gap-2.5 justify-between items-stretch">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d79c77507db404005055b8a271d7e66a42644f63dd2bf5c064f65dc7511dfed3?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="cursor-pointer object-center my-auto w-6 aspect-square"
            />
            <div className="grow">Upload QR-Design</div>
          </div>
        </div>
        <div
          className="cursor-pointer flex flex-col justify-center items-center self-center px-8 py-4 mt-8 max-w-full text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px]  max-md:px-5"
          onClick={() => {
            const defaultTemplate = getDefaultTemplate({
              width: item.width * 96,
              height: item.height * 96,
            })
            navigate("/designer")
            // setTimeout(() => {
            //   if (editor) {
            //     editor.frame.resize({
            //       width: parseInt(item.width * 96),
            //       height: parseInt(item.height * 96)
            //     })
            //     setCurrentDesign({
            //       ...currentDesign,
            //       frame: {
            //         width: parseInt(item.width * 96),
            //         height: parseInt(item.height * 96)
            //       },
            //     })
            //   }
            // }, 2500);
            // setCurrentDesign({
            //   id: nanoid(),
            //   frame: defaultTemplate.frame,
            //   metadata: {},
            //   name: "Untitled Design",
            //   preview: "",
            //   scenes: [],
            //   type: "PRESENTATION",
            // })
          }}
        >
          <div className="flex gap-2.5 justify-between items-stretch">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d79c77507db404005055b8a271d7e66a42644f63dd2bf5c064f65dc7511dfed3?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="cursor-pointer object-center my-auto w-6 aspect-square"
            />
            <div className="grow">Use EDM <i className="text-sm">( Custom Design )</i></div>
          </div>
        </div>
      </div>
      <input style={{ visibility: "hidden" }} type="file" ref={fileRef} onChange={(e) => onFileUpload(e)}></input>
      <div ref={picRef}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "30px",
            marginTop: "20px",
          }}
          ref={picRef}
        >
          <div className="pic-upload-cube">
            <img src={file.image}></img>
          </div>
          <div className="pic-upload-cube">
            <img src={file.image}></img>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <div className="pic-upload-cube">
            <img src={file.image}></img>
          </div>
          <div className="pic-upload-cube">
            <img src={file.image}></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem
