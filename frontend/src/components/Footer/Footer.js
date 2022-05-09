import React from 'react'
import "../Footer/footer.css"

const Footer = () => {
    return (
       
         <footer>
        Created by <span id="kalpesh"> - Kalpesh Wani .</span>
        <br />
        <span>
            <i
                className="fab fa-github"
                onClick={() =>
                    window.open("https://github.com/Kalpeshwani222", "_blank")
                }
            ></i>
        
            <i
                className="fab fa-linkedin"
                onClick={() =>
                    window.open(
                        "https://www.linkedin.com/in/wanikalpesh/",
                        "_blank"
                    )
                }
            ></i>
            <i
                className="fab fa-youtube"
                onClick={() =>
                    window.open(
                        "https://www.youtube.com/channel/UCNhcwdT-CRazfiAW7iVVDTw",
                        "_blank"
                    )
                }
            ></i>
            <i
                className="fas fa-envelope"
                onClick={() =>
                    window.open("mailto:wanikalpeshanil@gmail.com", "_blank")
                }
            ></i>

           
            
        </span>
    </footer>
    )
}

export default Footer
