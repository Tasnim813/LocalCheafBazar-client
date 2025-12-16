import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart, FaUtensils } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={40} className="text-orange-600" />,
      title: "Browse Meals",
      description: "Explore a variety of delicious meals from top chefs near you.",
    },
    {
      icon: <FaShoppingCart size={40} className="text-orange-600" />,
      title: "Place Order",
      description: "Add your favorite meals to the cart and place your order easily.",
    },
    {
      icon: <FaUtensils size={40} className="text-orange-600" />,
      title: "Enjoy at Home",
      description: "Get your meal delivered quickly and enjoy at the comfort of your home.",
    },
  ];

  return (
    <section className="py-20 bg-orange-50">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-orange-700 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        How ChefBazar Works
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl text-center border border-orange-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.3 }}
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-orange-700">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
