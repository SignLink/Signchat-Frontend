import "./Navigations.css";

interface props {
  buttonName: string;
  openModal?: any;
  create?: any;
}

export default function Button(props: props) {
  return (
    <>
      <button className="blue-button" onClick={props.openModal || props.create}>
        {props.buttonName}
      </button>
    </>
  );
}
