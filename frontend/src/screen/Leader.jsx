import { useEffect, useState } from "react";
import axios from "axios";
import { CloudinaryContext, Image } from "cloudinary-react";
const cloudName = 'sangtran127';
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
const Leader = () => {
    // []
    const [leadership, setLeadership] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState(null);
    const [selectedLeadership, setSelectedLeadership] = useState(null);

    const [newLeadership, setNewLeadership] = useState({
        name: '',
        image: '',
        designation: '',
        abbr: '',
        description: '',
        featured: false,
    });
    async function getLeadership() {
        try {
            const response = await axios.get('http://localhost:3052/api/leadership');
            const LeadershipList = response.data;
            setLeadership(LeadershipList)
            setLoading(false)

        } catch (error) {
            console.error(error);
        }
    }
    async function deleteLeadership(leadershipId) {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:3052/api/leadership/${leadershipId}`);
            setLoading(false)
            toast('Delete successfully')
        } catch (error) {
            console.error(error);
        }
    }
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        // enter ur own preset
        formData.append('upload_preset', '');
        // Upload image to Cloudinary
        // enter ur own link cloudinary
        axios.post("", formData)
            .then((data) => {
                setNewLeadership((prev) => ({ ...prev, image: data.data.secure_url }));
            })
            .catch((error) => {
                console.error('Error uploading image: ', error);
            });
    };

    useEffect(() => {
        getLeadership();

    }, [loading]);
    async function createLeadership(newLeadership) {
        try {
            console.log(newLeadership)
            setLoading(true)
            await axios.post('http://localhost:3052/api/leadership', {
                ...newLeadership
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false)
            setNewLeadership({
                name: '',
                image: '',
                abbr: '',
                designation: '',
                description: '',
                featured: false,
            });
            setOpenModal(false)
            toast("Add successfully")
        } catch (error) {
            console.error(error.message);
        }
    }

    function openAddModal() {
        setNewLeadership({
            name: '',
            image: '',
            designation: '',
            abbr: '',
            description: '',
            featured: false,
        });
        setOpenModal(true)
        setType("add")
    }
    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewLeadership((prevLeadership) => ({
            ...prevLeadership,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (type === "add") {
            createLeadership(newLeadership);
        } else if (type === "edit" && selectedLeadership) {
            updateLeadership(selectedLeadership._id, newLeadership);
        }

    }
    function openEditModal(leadership) {
        setOpenModal(true);
        setType("edit");
        setSelectedLeadership(leadership);
        setNewLeadership(leadership);
    }

    async function updateLeadership(leadershipId, updatedLeadership) {
        try {
            setLoading(true)

            await axios.patch(`http://localhost:3052/api/leadership/${leadershipId}`, updatedLeadership);
            setLoading(false)
            setSelectedLeadership(null);

            setNewLeadership({
                name: '',
                image: '',
                designation: '',
                abbr: '',
                description: '',
                featured: false,
            });
            setOpenModal(false)
            toast("update successfully")
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
                    {leadership.map((leadership) => (
                        <div className="grid-item" key={leadership._id}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h3>Action: </h3>
                                    <div>
                                        <button onClick={() => openEditModal(leadership)}>Edit</button>
                                        <button onClick={() => deleteLeadership(leadership._id)}>Delete</button>
                                    </div>
                                </div>
                                <div>
                                    <h3>
                                        <Link to={`/leadership/${leadership._id}`}>{leadership.name}</Link>
                                    </h3>
                                    <img src={leadership.image} alt={leadership.name} width={200} height={200} />
                                    <p>{leadership.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ReactModal
                isOpen={openModal}
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
                    <div>
                        {type === "add" || (type === "edit" && selectedLeadership) ? (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 600, height: 600 }}>
                                <input
                                    type="text"
                                    name="name"
                                    value={newLeadership.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                                <textarea
                                    type="text"
                                    name="description"
                                    className="custom-texarea"
                                    value={newLeadership.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    rows={5}
                                    cols={6}
                                />
                                <input
                                    type="text"
                                    name="abbr"
                                    value={newLeadership.abbr}
                                    onChange={handleInputChange}
                                    placeholder="Abbr"
                                />
                                <input
                                    type="text"
                                    name="designation"
                                    value={newLeadership.designation}
                                    onChange={handleInputChange}
                                    placeholder="designation"
                                />
                                <input type="file" onChange={handleImageUpload} accept="image/png, image/gif, image/jpeg" />
                                {newLeadership.image?.length > 0 && (
                                    <CloudinaryContext cloudName={cloudName}>
                                        <Image publicId={newLeadership.image} width="300" height="300" />
                                    </CloudinaryContext>
                                )}
                                <button type="submit">{type === "add" ? "Add Leadership" : "Update Leadership"}</button>
                            </form>
                        ) : null}
                    </div>
                </div>
            </ReactModal>
        </section >
    )
}

export default Leader