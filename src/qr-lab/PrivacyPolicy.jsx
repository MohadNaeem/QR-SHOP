import React from "react"
import MetaData from "./components/MetaData"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@mui/material"
import { MenuBarComponent } from "./components/MenuBarComponent"
import './styles/policy.css'

const PrivacyPolicy = () => {
  const navigate = useNavigate()
  const smUp = useMediaQuery("(max-width:600px)")
  const onNavigate = (link) => {
    navigate.push(`/${link}`)
  }
  return (
    <div className="flex flex-col items-stretch pt-5 pb-12 bg-neutral-50">
      <MetaData title={"Terms of Service and Privacy Policy"} />
      {window.innerWidth < 700 ? (
        <MenuBarComponent />
      ) : (
        <div className="mx-auto" style={{ width: "80%" }}>
          <MenuBarComponent />
        </div>
      )}
      <div className="privacy-policy-container">
        <div className="container___">
          <h1>Terms of Service and Privacy Policy of QR Shop</h1>
          <p style={{ fontSize: "16px", fontWeight: "600" }}> Effective Date: 07-02-2024</p>
          <p>
            Welcome to the Legal Hub of the QR Lab Print Shop, a specialized service by The Lab Group focused on QR code
            related print services. This hub provides detailed information on our operational policies, including
            Privacy, Terms of Service, Return and Refund, and Cookie Policy, ensuring transparency and understanding
            between QR Lab or the QR Lab Print Shop and all its users.
          </p>
          <h3 style={{ fontWeight: "600" }}>
            For comprehensive policies that govern all our products, please also see our wider policies:
          </h3>
          <ul className="ms-8 mt-4">
            <li className="cursor-pointer">
              <a
                src="https://www.thelabgroup.com/footer/cookies-policy"
                onClick={() => window.location.replace("https://www.thelabgroup.com/footer/cookies-policy")}
              >
                Cookie Policy
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                onClick={() => window.location.replace("https://www.thelabgroup.com/footer/terms-of-service")}
                src="https://www.thelabgroup.com/footer/terms-of-service"
              >
                Terms of Service
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                onClick={() => window.location.replace("https://www.thelabgroup.com/footer/privacy-policy")}
                src="https://www.thelabgroup.com/footer/privacy-policy"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
          <h2>1. Privacy Policy for the QR Lab Print Shop</h2>
          <p>
            QR Lab or the QR Lab Print Shop, as part of The Lab Group, is dedicated to protecting the privacy of its
            users. We collect personal information such as names, addresses, and payment details processed securely
            through Stripe to facilitate your orders and improve our services. We share necessary data with Stripe for
            payment processing and Printful for order fulfillment. Users have rights to access, correct, or delete their
            personal information under certain conditions. For detailed inquiries, please contact us directly at
            hello@thelabgroup.com.
          </p>
          <h2>2. Terms of Service for QR Lab or the QR Lab Print Shop</h2>
          <p>
            By using QR Lab or the QR Lab Print Shop, you agree to these Terms, which govern your use of our QR code
            generation and print services. Users must ensure that the content they upload for printing does not infringe
            on any intellectual property rights. The Lab Group limits its liability for losses or damages arising from
            the use of our service, especially those related to third-party services like Stripe and Printful. These
            Terms are governed by UK law.
          </p>
          <h2>3. Return and Refund Policy for QR Lab or the QR Lab Print Shop</h2>
          <p>
            QR Lab or the QR Lab Print Shop aims to ensure satisfaction with your orders. Products can be returned
            within 30 days under certain conditions, primarily if they are defective or not as ordered. The process for
            returns and refunds, including limitations and exclusions, is designed to be straightforward and
            user-friendly. For specific return requests or more information, please reach out to our support team at
            hello@thelabgroup.com.
          </p>
          <h2>4. Cookie Policy for QR Lab or the QR Lab Print Shop</h2>
          <p>
            Our website uses cookies to enhance user experience, analyze site usage, and assist in our marketing
            efforts. By using QR Lab or the QR Lab Print Shop, you consent to our use of cookies. You can manage your
            cookie preferences in your browser settings. For further details on the types of cookies we use and their
            purposes, please contact us at hello@thelabgroup.com.
          </p>
          <h2>4. Intellectual Property Concerns</h2>
          <p>
            Users grant QR Lab or the QR Lab Print Shop a license to use the uploaded content (e.g., QR codes) for the
            purpose of fulfilling print orders. QR Lab or the QR Lab Print Shop does not claim ownership of the uploaded
            content but requires that users have the right to use and reproduce the content for printing.
          </p>
          <h2>5. Limitation of Liability</h2>
          <p>
            QR Lab or the QR Lab Print Shop, part of The Lab Group, provides QR code generation and print services in
            collaboration with third-party services like Stripe for payment processing and Printful for order
            fulfillment. We do not take legal responsibility for the actions, products, or services of these third
            parties. Returns, refunds, and quality concerns are handled in line with Printful's existing policies, to
            which users are directed for such issues.
          </p>
          <h2>6. Contact Us</h2>
          <p>
            For any questions or clarifications regarding our Legal Hub, privacy practices, service terms, or any other
            inquiries, please contact us at hello@thelabgroup.com.
          </p>
          <h2>Conclusion</h2>
          <p>
            Thank you for choosing QR Lab or the QR Lab Print Shop for your QR code generation and printing needs. We
            are committed to providing a transparent, secure, and legally compliant service to all our users. Your trust
            and satisfaction are our top priorities as we continue to serve your needs across all The Lab Group
            platforms.
          </p>
        </div>
      </div>
      <div className="flex gap-5 justify-between items-stretch self-center mt-20 w-full max-w-[1090px] max-md:flex-wrap max-md:mt-10 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-between items-stretch self-start basis-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5b0b8d21f81131cfd0c2336e18c3b62c9d53cd10e2ebc8cbdee59865a116e75?apiKey=599dc50b3d834ed59f450af622cca86d&"
            className="object-contain object-center aspect-square fill-indigo-500 w-[41px]"
          />
          <div className="flex gap-1 justify-between items-stretch pr-16 mt-5 max-md:pr-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5a24748d72922531b97a19c4a302812bcd8a3af3bb423fdd3f444525c4f9b4a?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-contain object-center shrink-0 w-5 aspect-square fill-slate-600"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a67804ae4434182af2130383a4fa978aea668c77b210e9c6d646fc428e2f15c1?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-contain object-center shrink-0 w-5 aspect-square fill-slate-600"
            />
          </div>
          <div className="flex gap-0.5 justify-between items-stretch pr-5 mt-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e2f315659add8126a459bd1c39d520034fa092215de6a138f770f2694c9abd3?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-contain object-center shrink-0 w-5 aspect-square"
            />
            <div className="grow my-auto text-lg tracking-wide leading-4 text-center text-slate-600">English(uk)</div>
          </div>
        </div>
        <div className="px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
            <div className="flex flex-col items-stretch w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Home</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Qr Lab</div>
                <div className="mt-6 leading-[89%]">Contacts & Help Line</div>
                <div className="mt-6 leading-[89%] max-md:mt-10" onClick={() => navigate.push("/policy/privacy")}>
                  Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-stretch ml-5 w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Products</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Products</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 w-[14%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Products</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="self-center mt-20 text-lg tracking-wide leading-4 text-center whitespace-nowrap text-slate-600 max-md:mt-10">
        © 2024 TheLabGroup
      </div>
    </div>
  )
}

export default PrivacyPolicy
