import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiLinkedin, CiFacebook } from "react-icons/ci";
import { RiTwitterXLine } from "react-icons/ri";
import { ImPinterest2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { Accordion, Button } from "flowbite-react";

const Footer = () => {
  return (
    <div className="bg-black text-white px-48 max-lg:px-12 py-8 ">
      <div className="footer-body flex gap-10 justify-between">
        <div className="need-help">
          <h1 className="text-xl text-yellow-300 font-semibold">NEED HELP</h1>
          <ul className="flex flex-col gap-2 mt-4">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
          </ul>
        </div>
        <div className="company">
          <h1 className="text-xl text-yellow-300 font-semibold">COMPANY</h1>
          <ul className="flex flex-col gap-2 mt-4">
            <li>About Us</li>
            <li>Beyoung Blog</li>
            <li>Beyoungistan</li>
            <li>Collaboration</li>
            <li>Media</li>
          </ul>
        </div>
        <div className="need-help max-sm:hidden">
          <h1 className="text-xl text-yellow-300 font-semibold">MORE INFO</h1>
          <ul className="flex flex-col gap-2 mt-4">
            <li>Term and Conditions</li>
            <li>Track Order</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div className="need-help max-sm:hidden">
          <h1 className="text-xl text-yellow-300 font-semibold">LOCATION</h1>
          <ul className="flex flex-col gap-2 mt-4 max-lg:mt-2">
            <li>support@beyoung.in</li>
            <li>Eklingpura Chouraha, Ahmedabad Main Road</li>
            <li>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</li>
          </ul>
          <div className="downloads mt-8 max-md:mt-4">
            <h1 className="text-xl text-yellow-300 font-semibold mb-8 max-lg:mb-4">
              DOWNLOAD THE APP
            </h1>
            <div className="images flex max-lg:flex-col max-lg:gap-2 gap-8">
              <img
                src="https://www.beyoung.in/api/catalog/footer/11Play-Store-footer.png"
                alt=""
                className="max-lg:w-1/2 max-md:w-2/3"
              />
              <img
                src="https://www.beyoung.in/api/catalog/footer/12App-Store-footer.png"
                alt=""
                className="max-lg:w-1/2 max-md:w-2/3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-faq">
        <Accordion className="my-12">
          <Accordion.Panel>
            <Accordion.Title className="text-xl font-bold text-slate-400">
              WHY CHOOSE US?
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex flex-wrap gap-4">
                <h1 className="text-lg font-semibold">Online Shopping Site</h1>{" "}
                India's Best Online Shopping Site for Fashion and Lifestyle
                Started in 2018, Beyoung is the Best Site for online shopping in
                India when it comes to a vast collection of men's and women's
                fashion. The latest trends and styles are showcased here, yes at
                your favorite online fashion store. Well, if fashion is
                medicine, then Be Young is the chemist shop where you can do
                your online shopping for fashion with ease. Nothing to brag
                about, but we are the classic blend of 'Creativity' and 'Style'.
                Get The Young Out with Beyoung, our slogan says a lot about us.
                Our website is filled with the cool outfits that you always
                crave. Indeed, online shopping for women and men at Beyoung is
                hassle-free that in just a few clicks, one can purchase whatever
                he/she wants. A one-stop destination for all your shopping
                needs, Beyoung caters to each taste and need of every
                personality. The premium quality, affordable style, and trending
                graphics go into the making of our vast collection of men's and
                Women's Clothing. So, go ahead and indulge with India's best
                online shopping website for fashion. To know more about us,
                scroll below!
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="text-xl font-bold text-slate-400">
              POPULAR CATEGORIES
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex flex-wrap gap-4">
                <h1 className="text-xl text-yellow-300 font-semibold">
                  MEN'S CLOTHING
                </h1>
                <p>
                  Topwear: Half Sleeve T-Shirts | Full Sleeve T-Shirts | Men's
                  Shirts | Printed T-Shirts | Plain T-Shirts | Polo T-Shirts |
                  Plus Size T-Shirts | Combos Theme Based T Shirts: Ipl T Shirts
                  | Men's Travel T-shirts | Gym T Shirts | Quotes T Shirt |
                  Cartoon T Shirt | Entrepreneur T-Shirts | Student T Shirts |
                  Funky T Shirts Winter Collection: Hoodies for Men |
                  Sweatshirts for Men | Jackets for Men
                </p>
                <h1 className="text-xl text-yellow-300 font-semibold">
                  WOMEN'S CLOTHING
                </h1>
                <p>
                  Topwear: Women Shirts | Half Sleeve T-Shirts | Full Sleeve
                  T-Shirts | Printed T-Shirts | Plain T-Shirts | Crop Tops |
                  Plus Size T-Shirts | kurti Theme Based T Shirts: Women's
                  Travel T-shirts | Feminist T-shirts Winter Collection: Hoodies
                  for Women | Sweatshirts for Women | Long Coats for Women
                </p>
                <h1 className="text-xl text-yellow-300 font-semibold">
                  CUSTOMIZATION
                </h1>
                <p>Custom T Shirt</p>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
      <div className="flex mt-4">
        <div className="payment border-r-2 border-yellow-200 pr-12 max-sm:pr-6 flex flex-col justify-center">
          <h1 className="text-xl font-bold">100% SECURE PAYMENT</h1>
          <img
            src="https://www.beyoung.in/api/catalog/footer/Frame-payment -1.jpg"
            alt="payment"
            className="w-[500px] mt-6 max-md:hidden"
          />
        </div>
        <div className="contact flex flex-col gap-4 pl-12 max-sm:pl-6">
          <h1 className="text-xl font-bold">LET'S BE FRIENDS</h1>
          <div className="social-links flex gap-4 text-3xl mt-3">
            <FaInstagram />
            <CiLinkedin />
            <CiFacebook className="max-sm:hidden" />
            <RiTwitterXLine />
            <ImPinterest2 className="max-sm:hidden" />
            <AiOutlineYoutube className="max-sm:hidden" />
          </div>
        </div>
      </div>
      <h1 className="text-md font-semibold mt-12 text-center">
        Copyright © 2023 Beyoung Folks Pvt Ltd. All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
