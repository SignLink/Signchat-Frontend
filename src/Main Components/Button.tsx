import "../Main Components/Navigations.css";

interface props {
  buttonName: string;
  openModal?: any;
}

export default function Button(props: props) {
  return (
    <>
      <button className="blue-button" onClick={props.openModal}>
        {props.buttonName}
      </button>
    </>
  );
}
