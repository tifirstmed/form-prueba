import { CompletedFormProps } from "./CompletedForm.type";
import { motion } from "framer-motion";

const CompletedForm: React.FC<CompletedFormProps> = ({ formCompleted }) => {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{
        y: formCompleted ? "0%" : "100%",
        opacity: formCompleted ? 1 : 0,
      }}
      transition={{ duration: 0.5 }}
      className={`w-full h-full bg-[#6CA936] absolute top-0 rounded-lg`}
    >
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-lg lg:text-3xl text-center select-none">
          <strong>¡Muchas gracias!</strong>
          <br />
          Uno de nuestros asesores te contactará
        </p>
      </div>
    </motion.div>
  );
};

export default CompletedForm;
