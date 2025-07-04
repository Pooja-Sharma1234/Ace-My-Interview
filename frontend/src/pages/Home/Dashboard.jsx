import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/ApiPaths";
import moment from "moment";
import SummaryCard from "../../components/cards/SummaryCard";

import CreateSessionForm from "./CreateSessionForm";
import Modal from "../../components/Modal";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import toast from "react-hot-toast";
const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("session deleted successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <div>
      <DashBoardLayout>
        <div className="container mx-auto pt-4 pb-4">
          <div className="grid grid-cols-1  md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {sessions.length === 0 ? (
              <div className="text-center text-gray-600 col-span-3 px-4">
                No sessions generated yet. Click "Add New" to start preparing
                for your future interview.
              </div>
            ) : (
              sessions.map((data, index) => (
                <SummaryCard
                  key={data?._id}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "--"}
                  questions={data?.questions?.length || "--"}
                  description={data?.description || ""}
                  lastUpdatedAt={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))
            )}
          </div>
          <button
            className="h-12 md:h-12 flex items-center justify-center gap-3 
             bg-gradient-to-r from-purple-700 to-fuchsia-700 
             text-sm font-semibold text-white px-7 py-2.5 
             rounded-full transition-all duration-300 
             hover:shadow-lg hover:shadow-fuchsia-400/30 
             hover:scale-105 fixed bottom-10 md:bottom-20 right-10 md:right-20"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-2xl text-white" />
            Add New
          </button>
        </div>
        <Modal
          isOpen={openCreateModal}
          onClose={() => {
            setOpenCreateModal(false);
          }}
          hideHeader
        >
          <div>
            <CreateSessionForm />
          </div>
        </Modal>
        <Modal
          isOpen={openDeleteAlert?.open}
          onClose={() => {
            setOpenDeleteAlert({ open: false, data: null });
          }}
          title="Delete Alert"
        >
          <div className=" w-[30vw]">
            <DeleteAlertContent
              content="Are you sure you want to delete?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Modal>
      </DashBoardLayout>
    </div>
  );
};

export default Dashboard;
