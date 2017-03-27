'use strict';

const Actions = require('./actions');

const React = require('react');
const Store = require('./store');

import {bindAll} from 'lodash';
import $ from 'jquery';

import './css/image.styl';

class ImagePage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getDetails();
        Actions.getUser();
        //this.state = Store.getState();

        this.state = {
            data_uri: null,
            processing: false,

            file: '',
            imagePreviewUrl: ''
        }

        bindAll(this, 'handleFile', 'handleSubmit');
    }

    //=== image upload===

    handleSubmit(e) {
        if (!this.state.data_uri) return;
        e.preventDefault();
        const _this = this;

        this.setState({
            processing: true
        });

        Actions.uploadImage({
            data_uri: this.state.data_uri,
            filename: this.state.filename,
            filetype: this.state.filetype
        });

    }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        this.setState({
            processing: false
        });            

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type,

                file: file,
                imagePreviewUrl: reader.result                
            });
        };

        reader.readAsDataURL(file);
    }   
    //=================

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        let processing;
        let uploaded;

        if (this.state.uploaded_uri) {
            uploaded = (
                <div>
                    <h4>Image uploaded!</h4>
                    <img className='image-preview' src={this.state.uploaded_uri} />
                    <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
                </div>
            );
        }

        if (this.state.processing) {
            processing = " Image uploaded.";
        }
        else{
            processing = "";
        }         

        return (
            <section className="container">
                <h1 className="page-header">Image view</h1>
                <div className="row">
                    <div className="col-sm-6">
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12'>
                        <label>Upload an image</label>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <input className='fileInput' type="file" onChange={this.handleFile} />
                            <input className='btn btn-primary' type="submit" value="Upload" />
                            {processing}
                        </form>
                        {uploaded}
                    </div>
                </div>
                <div className="imgPreview">
                    {$imagePreview}
                </div>                

            </section>

        );
    }
}


module.exports = ImagePage;
