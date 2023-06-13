import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const PromotionDetail = () => {
    const { promotionId } = useParams();
    const nav = useNavigate()
    const [promotionDetail, setPromotionDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (promotionId) {
            axios.get(`http://localhost:3052/api/promotion/${promotionId.toString()}`).then((res) => {
                setPromotionDetail(res.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [promotionId])
    async function deletePromotion(promotionId) {
        try {

            await axios.delete(`http://localhost:3052/api/promotion/${promotionId}`);
            nav(-1)
        } catch (error) {
            console.error(error);
        }
    }
    return !loading && (
        <div className="promotion-detail">

            <div className="promotion-detail-image">
                <img src={promotionDetail.image} alt={promotionDetail.name} />
            </div>
            <div className="promotion-detail-content">
                <div>
                    <button>Edit</button>
                    <button onClick={() => deletePromotion(promotionId)}>Delete</button>
                </div>
                <h2 className="promotion-detail-title">{promotionDetail.name}</h2>
                <div className="promotion-detail-label">
                    <span className="label">{promotionDetail.label}</span>
                    {promotionDetail.featured && <span className="featured">Featured</span>}
                </div>
                <div className="promotion-detail-price">
                    <span className="price">${promotionDetail.price.$numberDecimal}</span>
                </div>
                <p className="promotion-detail-description">{promotionDetail.description}</p>
            </div>
        </div>
    )
}

export default PromotionDetail