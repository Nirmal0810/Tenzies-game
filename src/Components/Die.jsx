export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
     
        <div className="die-face"
             style={styles} onClick={props.dieIsHeld}>
            <h2>{props.value}</h2>
        </div>
        
    )
}