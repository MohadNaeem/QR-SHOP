import React, { useState } from "react"
import { Modal, ModalBody, SIZE, ROLE } from "baseui/modal"
import useEditorType from "~/hooks/useEditorType"
import { Block } from "baseui/block"
import Video from "./Video"
import Presentation from "./Presentation"
import Graphic from "./Graphic"
import { FixedLoader } from "../../../../qr-lab/components/loader.jsx"

interface ComponentProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  setVariantId: (data: any) => void
  // setIsLoading: (v: boolean) => void
}
const Preview = ({ isOpen, setIsOpen, setVariantId }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const editorType = useEditorType()
  return (
    <FixedLoader active={isLoading}>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.full}
        role={ROLE.dialog}
        overrides={{
          Root: {
            style: {
              zIndex: 5,
            },
          },
          Dialog: {
            style: {
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        }}
      >
        <ModalBody
          $style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            height: "100%",
            position: "relative",
          }}
        >
          <Block
            $style={{
              position: "absolute",
              flex: 1,
              height: "100%",
              width: "100%",
              display: "flex",
            }}
          >
            {
              {
                GRAPHIC: <Graphic setVariantId={setVariantId} setIsLoading={setIsLoading} />,
                PRESENTATION: <Presentation />,
                VIDEO: <Video />,
                NONE: <></>,
              }[editorType]
            }
          </Block>
        </ModalBody>
      </Modal>
    </FixedLoader>
  )
}

export default Preview
