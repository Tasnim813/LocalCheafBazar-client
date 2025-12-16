import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import useAuth from "../../../hooks/useAuth"
import Container from "../Container"

const Footer = () => {
  const { user } = useAuth()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white shadow-sm text-gray-700 px-6 py-10 ">
<Container>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-600">
            Contact Us
          </h3>
          <p>Email: support@mealhub.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-600">
            Working Hours
          </h3>
          <p>Saturday – Thursday</p>
          <p>10:00 AM – 10:00 PM</p>
          <p>Friday: Closed</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-600">
            Follow Us
          </h3>
          <div className="flex gap-4 text-2xl text-orange-500">
            <a href="#" className="hover:text-orange-700 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-orange-700 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-700 transition">
              <FaTwitter />
            </a>
          </div>

          {/* Role based message */}
          {user?.role === "admin" && (
            <p className="mt-4 text-sm text-orange-600 font-medium">
              Admin Panel Access Enabled
            </p>
          )}

          {!user && (
            <p className="mt-4 text-sm text-gray-500">
              Login to access more features
            </p>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 border-t border-orange-200 pt-4 text-sm text-gray-500">
        © {year} MealHub. All rights reserved.
      </div>
      </Container>
    </footer>
  )
}

export default Footer
