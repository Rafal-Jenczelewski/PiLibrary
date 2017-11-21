import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CreateDialog from './Dialogs/CreateDialog';
import FileList from './FileList'
import PaginationBar from "./Dialogs/PaginationBar";
import Banner from './Banner';
import MenuBar from "./MenuBar";

const client = require('../client');
const follow = require('../follow');
const root = "/api";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {files: [], attributes: [], pageSize: 10, links: {}};

        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'uploadedFiles', params: {size: pageSize}}]
        ).then(filesCollection => {
            return client({
                method: 'GET',
                path: filesCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return filesCollection;
            });
        }).done(filesCollection => {
            this.setState({
                files: filesCollection.entity._embedded.uploadedFiles,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: filesCollection.entity._links
            });
        });
    }

    onCreate(data) {
        let formData = new FormData();

        formData.append("file", data.file);
        formData.append("name", data.name);
        formData.append("notes", data.notes);
        formData.append("tags", data.tags);

        fetch(root + "/uploadedFiles/upload", {
            mode: "cors",
            body: formData,
            method: "post",
        }).then(response => this.loadFromServer(this.state.pageSize))

        // client({
        //     method: 'POST',
        //     path: root + "/uploadedFiles/upload",
        //     body: formData
        // })
        // follow(client, root, ['uploadedFiles']).then(fileCollection => {
        //     return client({
        //         method: 'POST',
        //         path: fileCollection.entity._links.self.href,
        //         entity: newFile,
        //         headers: {'Content-Type': 'application/json'}
        //     })
        // }).then(response => {
        //     return follow(client, root, [
        //         {rel: 'uploadedFiles', params: {'size': this.state.pageSize}}]);
        // }).done(response => {
        //     if (typeof response.entity._links.last != "undefined") {
        //         this.onNavigate(response.entity._links.last.href);
        //     } else {
        //         this.onNavigate(response.entity._links.self.href);
        //     }
        // });
    }

    onDelete(name) {
        // client({method: 'DELETE', path: file._links.self.href}).done(response => {
        //     this.loadFromServer(this.state.pageSize);
        // });
        fetch(root + "/uploadedFiles/delete/" + name, {
            method: "delete",
            mode: "cors",
        }).then(response => this.loadFromServer(this.state.pageSize))
    }

    onNavigate(navUri) {
        client({method: 'GET', path: navUri}).done(fileCollection => {
            this.setState({
                files: fileCollection.entity._embedded.uploadedFiles,
                attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: fileCollection.entity._links
            });
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.setState({
                pageSize: pageSize
            });
            this.loadFromServer(pageSize);
        }
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        client({
            method: "GET",
            path: root + "/uploadedFiles/search"
        });
        client({
            method: "GET",
            path: root + "/comments"
        });
    }

    render() {
        return (<div className={"App"}>
            <Banner/>
            <MenuBar onUpload={this.onCreate} attributes={this.state.attributes}/>
            <div>
                <FileList files={this.state.files}
                          onDelete={this.onDelete}/>
                <PaginationBar links={this.state.links} pageSize={this.state.pageSize}
                               onNavigate={this.onNavigate} updatePageSize={this.updatePageSize}/>
            </div>
        </div>)
    }
}

ReactDOM.render(<App/>, document.getElementById('react'));
