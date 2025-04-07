import { FaPlus, FaUsers } from "react-icons/fa6"

const EventManagement = () => {
    return (
        <>
            <div className="tabs tabs-lift">
                <label className="tab">
                    <input type="radio" name="my_tabs_4" />
                    <FaPlus className="me-2" />
                    Add Event
                </label>
                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

                <label className="tab">
                    <input type="radio" name="my_tabs_4" defaultChecked />
                    <FaUsers className="me-2" />
                    All Events
                </label>
                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>
            </div>
        </>
    )
}
export default EventManagement