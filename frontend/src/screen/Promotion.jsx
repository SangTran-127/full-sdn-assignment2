import { useEffect, useState } from "react";
import axios from "axios";
import { CloudinaryContext, Image } from "cloudinary-react";
const cloudName = 'sangtran127'; // Replace with your Cloudinary cloud name
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
ReactModal.setAppElement('#root');
const Promotion = () => {
    // []
    const [promotions, setPromotion] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState(null);
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    const [newPromotion, setNewPromotion] = useState({
        name: '',
        image: '',
        label: 'aa',
        price: '',
        description: '',
        featured: false,
    });
    async function getPromotions() {
        try {
            const response = await axios.get('http://localhost:3052/api/promotion');
            const promotionList = response.data;
            // Do something with the promotions data
            setPromotion(promotionList)
            setLoading(false)

        } catch (error) {
            console.error(error);
        }
    }
    async function deletePromotion(promotionId) {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:3052/api/promotion/${promotionId}`);
            // Perform any necessary actions after successful deletion
            setLoading(false)
            toast('Delete successfuly')
        } catch (error) {
            console.error(error);
        }
    }
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', '');
        // Upload image to Cloudinary
        axios.post("", formData)
            .then((data) => {
                setNewPromotion((prev) => ({ ...prev, image: data.data.secure_url }));
                console.log(data)
            })
            .catch((error) => {
                console.error('Error uploading image: ', error);
            });
    };

    useEffect(() => {
        getPromotions();

    }, [loading]);
    async function createPromotion(newPromotion) {
        try {
            console.log(newPromotion)
            setLoading(true)
            await axios.post('http://localhost:3052/api/promotion', {
                ...newPromotion
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false)
            setNewPromotion({
                name: '',
                image: '',
                label: '',
                price: '',
                description: '',
                featured: false,
            });
            setOpenModal(false)
            toast('Create successfully')
        } catch (error) {
            console.error(error.message);
        }
    }

    function openAddModal() {
        setNewPromotion({
            name: '',
            image: '',
            label: '',
            price: '',
            description: '',
            featured: false,
        });
        setOpenModal(true)
        setType("add")
    }
    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewPromotion((prevPromotion) => ({
            ...prevPromotion,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (type === "add") {
            createPromotion(newPromotion);
        } else if (type === "edit" && selectedPromotion) {
            updatePromotion(selectedPromotion._id, newPromotion);
        }

    }
    function openEditModal(promotion) {
        setOpenModal(true);
        setType("edit");
        setSelectedPromotion(promotion);
        setNewPromotion(promotion);
    }

    async function updatePromotion(promotionId, updatedPromotion) {
        try {
            setLoading(true)

            await axios.patch(`http://localhost:3052/api/promotion/${promotionId}`, updatedPromotion);
            setLoading(false)
            // Do something with the updated promotion data
            setSelectedPromotion(null);
            setNewPromotion({
                name: '',
                image: '',
                label: '',
                price: '',
                description: '',
                featured: false,
            });
            setOpenModal(false)
            toast('Update successfully')
        } catch (error) {
            console.error(error);
        }
    }
    return (
        !loading && <section>
            <div style={{
                // backgroundColor: 'rgba(0,0,0, 0.4)'
                backdropFilter: 'blur(8px)',
            }}>
                <div style={{
                    marginBottom: '3rem'
                }}>
                    <div>
                        <button onClick={openAddModal}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="grid-container">
                    {promotions.map((promotion) => (
                        <div className="grid-item" key={promotion._id}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h3>Action: </h3>
                                    <div>
                                        <button onClick={() => openEditModal(promotion)}>Edit</button>
                                        <button onClick={() => deletePromotion(promotion._id)}>Delete</button>
                                    </div>
                                </div>
                                <div>
                                    <h3>
                                        <Link to={`/promotion/${promotion._id}`}>{promotion.name}</Link>
                                    </h3>
                                    <img src={promotion.image} alt={promotion.name} width={200} height={200} />
                                    <p>price: ${promotion.price.$numberDecimal}</p>
                                    <p>{promotion.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
            <ReactModal
                isOpen={openModal}
                // onAfterOpen={() => subtitle.style.color = '#f00'}
                onRequestClose={() => setOpenModal(false)}
                style={customStyles}
                contentLabel="Example Modal"

            >

                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '1rem'
                    }}>
                        <button onClick={() => setOpenModal(false)}>close</button>
                    </div>
                    <div >
                        {type === "add" || (type === "edit" && selectedPromotion) ? (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 600, height: 800 }}>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPromotion.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    name="label"
                                    value={newPromotion.label}
                                    onChange={handleInputChange}
                                    placeholder="Label"
                                />
                                <textarea
                                    type="text"
                                    name="description"
                                    className="custom-texarea"
                                    value={newPromotion.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"

                                />
                                <input
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    name="price"
                                    value={Number(newPromotion.price) || newPromotion.price?.$numberDecimal}
                                    onChange={handleInputChange}
                                    placeholder="Price"
                                />
                                <input type="file" onChange={handleImageUpload} accept="image/png, image/gif, image/jpeg" />
                                {newPromotion.image?.length > 0 && (
                                    <CloudinaryContext cloudName={cloudName}>
                                        <Image publicId={newPromotion.image} width="300" height="300" />
                                    </CloudinaryContext>
                                )}
                                <button type="submit">{type === "add" ? "Add Promotion" : "Update Promotion"}</button>
                            </form>
                        ) : null}
                    </div>
                </div>
            </ReactModal>
        </section>
    )
}

export default Promotion