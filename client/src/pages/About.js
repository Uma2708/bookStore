import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 text-justify">
          <p className="text-justify mt-2 ">
            
         <p> We are Uma & Vaishali, two learners who came together to build an online bookstore. With our project, we aim to provide a seamless and enjoyable shopping experience for book enthusiasts and create a community of readers who share their love for books.</p>

           Uma is responsible for the technical aspects of our project. 

           Vaishali is in charge of the content and curation of our bookstore.

          We are excited to share our project with you and hope that you will enjoy browsing our bookstore and discovering new books.
          Thank you for supporting our mission to promote reading and literacy.
          </p>
          <button type="button" class="btn btn-primary" onclick="toggleMoreContent()">Learn More...</button>
</div>


</div>
    </Layout>
  );
};

export default About;
