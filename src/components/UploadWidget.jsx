// import { useEffect, useRef } from "react";

// const UploadWidget = () => {
//   const cloudinaryRef = useRef();
//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: "dz6opiy3z",
//         uploadPreset: "ufldzebl",
//       },
//       function (error, result) {
//         console.log(result);
//       }
//     );
//   }, []);
//   return <button onClick={() => widgetRef.current.open()}>Upload</button>;
// };

// export default UploadWidget;

const ShowUploadWidget = () => {
  cloudinary.openUploadWidget(
    {
      cloudName: "dz6opiy3z",
      uploadPreset: "ufldzebl",
      sources: ["local", "camera", "facebook", "instagram"],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: false,
      cropping: true,
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#0078FF",
          action: "#8E3C10",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#E4EBF1",
        },
        fonts: { default: null, "sans-serif": { url: null, active: true } },
      },
    },
    (err, info) => {
      if (!err) {
        console.log("Upload Widget event - ", info);
      }
    }
  );
};

export default ShowUploadWidget;
