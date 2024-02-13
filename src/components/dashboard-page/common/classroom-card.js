const ClassroomCard = ({classroomDetails={classroomName:"Name",classroomDescription:"Desc"}}) => {
    return ( 
        <div className="card p-3 shadow-md rounded rounded-5 border-0 grow-on-hover cursor-pointer">
            <div className="bg-200 rounded rounded-4" style={{height:"12rem"}}>

            </div>
            <div className="mt-3">
                <div className="fw-bold text-900 lh-2" style={{fontSize:"18px"}}>
                    {classroomDetails.classroomName}
                </div>
                <div className="text-500 fs-6 lh-1" style={{fontSize:"14px"}}>
                    {classroomDetails.classroomDescription}
                </div>
            </div>
        </div> 
    );
}
 
export default ClassroomCard;