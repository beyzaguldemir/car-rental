// Higher Order Components (HOC)
// normal componentlar'dan farklı olarak hem açılış hem kapanış etiketleri olur ve içerinde yazılan değeri otomatik olarak children propu olarak gönderir
type Props={
    children:string;
}


const Warning = ({children}:Props) => {
  return (
    <div>{children}</div>
  )
}

export default Warning