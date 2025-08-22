import { toast } from "react-toastify";
const showSuccessSwal = (title, callback) => {
  toast.success(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => {
      if (callback) callback();
    },
    theme: "colored",
  });
};

const showErrorSwal = (title, callback) => {
  toast.error(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => {
      if (callback) callback();
    },
    theme: "colored",
  });
};

const calculateScore = (course) => {
  const trueComments = course.comments.filter(
    (comment) => comment.isShow === true
  );
  const scores = trueComments.map((comment) => comment.score);
  const totalScore = scores.reduce((a, b) => a + b, 0);
  if (trueComments?.length === 0) return 0;
  return Math.round(totalScore / trueComments?.length);
};

const getMe = async (setUser, setIsLocading) => {
  setIsLocading && setIsLocading(true);
  const res = await fetch("/api/auth/me");
  const data = await res.json();
  if (res.status === 200) {
    setIsLocading && setIsLocading(false);
    return setUser(data.user);
  }
  setIsLocading && setIsLocading(false);
};

export { showErrorSwal, showSuccessSwal, calculateScore, getMe };
