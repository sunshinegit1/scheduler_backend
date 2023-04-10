const db = require("../config/connection");

exports.createLeave= async(req,res)=>{
    data=req.body;
    db.query("insert into leaves set ?",[{
        emp_id:data.emp_id,
        lev_desc:data.lev_desc,
        lev_date:data.lev_date,
        lev_status:"pending"


    }],(err,result)=>{
        if(!err){
            res.status(200).json({message:"Leave created successfully"})
        }else{res.status(401).json({status:"failed"});
    console.log(err);}
    })
}
exports.updateLeave= async(req,res)=>{
    data=req.body;
    db.query("update leaves set lev_status=? where lev_id=? ",[data.lev_status,data.lev_id],
    (err,result)=>{
        if(!err){
            if (!err)
        res
          .status(200) .json({ status: "success",message: "Leaves updated successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
    })
}

exports.getLeaves = async (req, res) => {
    db.query("SELECT l.*,e.emp_name from leaves l,employee e where l.emp_id=e.emp_id", (err, result, fields) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "leaves not found" });
      } else res.status(401).json({ status: "failed" });
    });
  };

