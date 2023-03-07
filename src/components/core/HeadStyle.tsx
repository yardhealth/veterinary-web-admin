import React from 'react'

type Props = {
  name: string
}

const HeadStyle = ({ name }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-theme">{name}</h2>
    </div>
  )
}

export default HeadStyle

// const HeadStyle = ({ name }: Props) => {
// 	return <h2 className="text-lg font-bold text-theme">{name}</h2>;
// };
// export default HeadStyle;
