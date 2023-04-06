
// Dummy Scan, proper implementation later

function Scan(props){
    const time = props.time;
    const isDone = props.isDone;
    const count = props.count;
    let min = Math.floor(time / 60);
    let sec = time % 60;

    return(
        <div>
            <h3 className="ss">Scan Summary</h3>
            <div className="scan">
            <p className="sp1">Scan Duration<br></br><em id="em1">{min} min {sec} sec</em></p>   
            {isDone && <p className="sp2">Vulnerabilities Found<br></br><em id="em1">{count}</em></p>}
            {isDone && <p className="sp3">Scan Status<br></br><em id="em1">Finished</em></p>}
            {!isDone && <p className="sp3">Scan Status<br></br><em id="em1">Loading</em></p>}
            </div>
            <br></br>
            <br></br>
        <hr></hr>
        </div>
    );
}

export default Scan;