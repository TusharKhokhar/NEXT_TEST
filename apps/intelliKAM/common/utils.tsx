import Flag from "react-world-flags";

export const option = ({ innerProps, label, data }: any) => (
    <div
      {...innerProps}
      className="flex items-center gap-[10px] overflow-x-hidden ps-[10px]"
    >
      <Flag code={data.code} width="20px" />({data.value})
    </div>
  )