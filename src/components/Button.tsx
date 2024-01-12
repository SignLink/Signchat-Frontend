import "./Navigations.css";

interface props {
  buttonName: string;
  openModal?: any;
  create?: any;
  classname?: string;
}

export default function Button(props: props) {
  return (
    <>
      <button className={props.classname} onClick={props.openModal || props.create}>
        {props.buttonName}
      </button>
    </>
  );
}
