import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const LeaderDetail = () => {
    const { leaderId } = useParams();
    const nav = useNavigate()
    const [leaderDetail, setLeaderDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (leaderId) {
            axios.get(`http://localhost:3052/api/leadership/${leaderId.toString()}`).then((res) => {
                setLeaderDetail(res.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [leaderId])
    async function deletePromotion(leaderId) {
        try {

            await axios.delete(`http://localhost:3052/api/leadership/${leaderId}`);
            nav(-1)
        } catch (error) {
            console.error(error);
        }
    }
    return !loading && (
        <div >
            <div className="promotion-detail">

                <div className="promotion-detail-image">
                    <img src={leaderDetail.image} alt={leaderDetail.name} />
                </div>
                <div className="promotion-detail-content">
                    <div>
                        <button>Edit</button>
                        <button onClick={() => deletePromotion(leaderId)}>Delete</button>
                    </div>
                    <h2 className="promotion-detail-title">{leaderDetail.name}</h2>
                    <div className="promotion-detail-label">
                        <span className="label">{leaderDetail.designation}</span>
                        {leaderDetail.featured && <span className="featured">Designation</span>}
                    </div>
                    <div className="promotion-detail-price">
                        <span className="price">${leaderDetail.abbr}</span>
                    </div>
                    <p className="promotion-detail-description">{leaderDetail.description}</p>
                </div>
            </div>
        </div>
    )
}

export default LeaderDetail