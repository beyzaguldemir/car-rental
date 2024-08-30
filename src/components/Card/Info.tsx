import { CarType } from "../../type"
import {motion} from "framer-motion"
type Props={
    car:CarType;
}
type FieldProps={
    img:string;
    text:string;

}
const Field=({img, text}:FieldProps)=>{
    return (
        <motion.div initial={{translateY:"50px",opacity:0}} whileInView={{translateY:0,opacity:1}} className=" relative flex-center flex-col">
            <img src={img} width={25}  />
            <p>{text}</p>
        </motion.div>
    )
}
const Info = ({car}:Props) => {
    const transmission=car.transmission==="a" ? "otomatik" : "Manuel"
    const drive=car.drive==="fwd"?"Önden Çeker": car.drive==="rwd" ? "Arkadan İtişli" : "Dört Çeker"
  return (
    <div className="w-full flex justify-between group-hover:hidden">
        
        <Field img="/steering-wheel.svg" text={transmission}/>
        <Field img="/tire.svg" text={drive}/>
        <Field img="/gas.svg" text={car.fuel_type}/>

    </div>
  )
}

export default Info