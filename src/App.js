import React from "react";
import { Route } from "react-router-dom";
import Header from "./components/header/header-component";
import Footer from "./components/footer/footer-component";
import './App.scss';
import UploadImage from "./pages/upload-image/upload-image-component";
import SearchImage from "./pages/upload-image/search-image/search-image-component";

function App() {
    return (
    <div className="App" >
        <Header />
            <Route path='/upload-image' component={UploadImage} />
            <Route path='/search-image' component={SearchImage} />

        <Footer />
    </div>
    );
}


export default App;