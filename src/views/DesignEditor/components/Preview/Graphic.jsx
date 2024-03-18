import React from "react"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import { storage } from "../../../../qr-lab/firebase/firebase"
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { API_URL } from "../../../../qr-lab/QRShop"
import useDesignEditorContext from "../../../../hooks/useDesignEditorContext"

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

const Graphic = ({ setVariantId, setIsLoading }) => {
  const editor = useEditor()
  const { setDisplayPreview } = useDesignEditorContext()
  const { cartItems } = useSelector((state) => state?.cart)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()
  const alert = useAlert()
  const [state, setState] = React.useState({
    image: "",
  })

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = await editor.renderer.render(template)
      setState({ image })
      setLoading(false)
    }
  }, [editor])

  const uploadFile = () => {
    setIsLoading(true)
    const fileName = new Date().getTime()
    const imageRef = storageRef(storage, `products/${fileName}`)
    var fileToUpload = dataURLtoFile(state.image, fileName)
    uploadBytes(imageRef, fileToUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            if (url === "") {
              alert.error("Upload your QRCode to be printed")
              return
            }
            setIsLoading(true)
            await fetch(`${API_URL}/create-product?imageUrl=${url}&id=${cartItems[0]?.id}&name=${cartItems[0]?.name}`, {
              method: "POST",
            })
              .then((res) => res.json())
              .then((data) => {
                setVariantId({ ...data?.result?.sync_variants[0], ...data })
                setIsLoading(false)
                navigate("/shipping")
              })
              .catch((e) => {
                console.log(e)
                setIsLoading(false)
                alert.error("Unexpected error occured")
              })
            // setUrl(url)
            setDisplayPreview(false)
          })
          .catch((error) => {
            console.log(error)
            // setIsLoading(false)

            alert.error("Unexpected error occured.")
          })
      })
      .catch((error) => {
        console.log(error)
        // setIsLoading(false)
      })
  }

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <>
      <div
        className="cursor-pointer flex flex-col justify-center items-center self-center px-8 py-4 mt-8 max-w-full text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px]  max-md:px-5"
        onClick={() => {
          // navigate("/designer")
          uploadFile()
        }}
        style={{
          position: "fixed",
          top: "0px",
          right: "30px",
        }}
      >
        <div className="flex gap-2.5 justify-between items-stretch">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d79c77507db404005055b8a271d7e66a42644f63dd2bf5c064f65dc7511dfed3?apiKey=599dc50b3d834ed59f450af622cca86d&"
            className="cursor-pointer object-center my-auto w-6 aspect-square"
          />
          <div className="grow">Proceed</div>
        </div>
      </div>
      <Block
        className=""
        $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem 5rem" }}
      >
        {/* <button onClick={() => uploadFile()}>Click</button> */}
        {!loading && (
          <img
            width="auto"
            style={{
              height: "auto",
              maxHeight: "100%",
              width: "auto",
            }}
            src={state.image}
          />
        )}
      </Block>
    </>
  )
}

export default Graphic
