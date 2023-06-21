import React, { useState } from 'react'
import Dialog from '../../../components/UIComponents/Dialog'
import FormFieldset from '../../../components/UIComponents/FormFieldset'
import FormLabel from '../../../components/UIComponents/FormLabel'
import FormInput from '../../../components/UIComponents/Input'

export default function CreateCampaign() {
  const [showDialog, setShowDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    campaignType: '',
    videoScript: '',
    emailScript: '',
  })

  const { name } = formData

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  return (
    <div>
      <button className="btn ml-10 mt-10" onClick={() => setShowDialog(true)}>
        Create Campaign
      </button>
      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        additionalClassName="px-[50px] py-10 w-[900px]"
      >
        <>
          <h2 className="font-bold leading-9 text-[24px] mb-[30px] text-primary">
            Create a Campaign
          </h2>
          <FormFieldset className="mb-[40px]">
            <FormLabel className="text-primary font-extrabold text-[18px] leading-6 mb-[20px]">
              Give your campaign a name
            </FormLabel>
            <FormInput
              value={name}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  name: value,
                })
              }
              placeholder="Enter Campaign Name"
              className="w-[400px] text-secondary"
            />
          </FormFieldset>
          <FormFieldset className="mb-[40px]">
            <FormLabel className="text-primary font-extrabold text-[18px] leading-6 mb-[20px]">
              What type of campaign?
            </FormLabel>
          </FormFieldset>
        </>
      </Dialog>
    </div>
  )
}
