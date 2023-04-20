import React from "react";

export default function File({
  id,
}) {
  return (
    <div >
      <div style={{ textAlign:"center", fontWeight:800, marginBottom:30}}>FILE</div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "30vh", fontWeight: 800 }}>Link</div>
        <div style={{ width: "70vh" }}> <a> 
          File pdf của Đề thi giải tích
          </a></div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "30vh", fontWeight: 800 }}>Link</div>
        <div style={{ width: "70vh" }}> <a> 
             File pdf của Đề thi giải tích
          </a></div>
      </div>

    </div>
  );
}
