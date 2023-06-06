// import React, { Component } from "react";

// class CloudinaryUploadWidget extends Component {
//   componentDidMount() {
//     const cloudName = "dz6opiy3z";
//     const uploadPreset = "ufldzebl";

//     //   https://cloudinary.com/documentation/upload_widget_reference

//     let myWidget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: cloudName,
//         uploadPreset: uploadPreset,
//         cropping: true,
//         showSkipCropButton: false,
//         croppingAspectRatio: 1,
//         croppingDefaultSelectionRatio: 1,
//         croppingValidateDimensions: true,
//         sources: ["local", "camera", "facebook", "instagram"], // restrict the upload sources to URL and local files
//         multiple: false, //restrict upload to a single file
//         showCompletedButton: true,
//         singleUploadAutoClose: true,

//         clientAllowedFormats: ["images"],

//         maxImageWidth: 720, //Scales the image down to a width of    pixels before uploading
//       },
//       (error, result) => {
//         if (!error && result && result.event === "success") {
//           console.log("Done! Here is the image info: ", result.info);
//           console.log(result.info.secure_url);
//         }
//       }
//     );
//     document.getElementById("upload_widget").addEventListener(
//       "click",
//       function () {
//         myWidget.open();
//       },
//       false
//     );
//   }

//   render() {
//     return (
//       // <button id="upload_widget" className="cloudinary-button">
//       //   Upload
//       // </button>
//       <></>
//     );
//   }
// }

// export default CloudinaryUploadWidget;

import React, { useEffect } from "react";

const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
  useEffect(() => {
    const cloudName = "dz6opiy3z";
    const uploadPreset = "ufldzebl";

    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true,
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        croppingDefaultSelectionRatio: 1,
        croppingValidateDimensions: true,
        sources: ["local", "camera", "facebook", "instagram"],
        multiple: false,
        // showCompletedButton: true,
        // singleUploadAutoClose: true,
        // clientAllowedFormats: ["images"],
        maxImageWidth: 720,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log(result.info.secure_url);

          // Pass the secure URL to the callback function
          onUploadSuccess(result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
        console.log("opened the widget");
      },
      false
    );
  }, [onUploadSuccess]);

  return <></>;
};

export default CloudinaryUploadWidget;
