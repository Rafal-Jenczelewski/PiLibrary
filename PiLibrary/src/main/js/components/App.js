import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CreateDialog from './file/CreateDialog';
import FileList from './file/FileList'
import PaginationBar from "./PaginationBar";
import Banner from './Banner';
import MenuBar from "./MenuBar";

const client = require('../client');
const follow = require('../follow');
const root = "/api";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            attributes: [],
            pageSize: 10,
            links: {},
            fromSearch: false,
            searchTerm: ""
        };

        this.loadFromServer = this.loadFromServer.bind(this);
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.searchByString = this.searchByString.bind(this);
    }

    loadFromServer() {
        follow(client, root, [
            {rel: 'uploadedFiles', params: {size: this.state.pageSize}}]
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
                links: filesCollection.entity._links,
                fromSearch: false,
                searchTerm: ""
            });
        });
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
            }, () => this.loadFromServer());
        }
    }

    searchByString(searchString) {
        client({
            method: 'get',
            path: root + '/uploadedFiles/search/findWithTags/' + searchString
        }).then(response => {
            this.setState({
                files: response.entity.sort((item1, item2) => {
                    return item1.name.localeCompare(item2.name)
                }),
                links: [],
                fromSearch: true,
                searchTerm: searchString
            })
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    render() {
        const fileList = <FileList files={this.state.files}
                                   onDelete={this.loadFromServer}/>;

        let content = null;
        if (!this.state.fromSearch)
            content = <div className="app-content">
                {fileList}
                <PaginationBar links={this.state.links} pageSize={this.state.pageSize}
                               onNavigate={this.onNavigate} updatePageSize={this.updatePageSize}/>
            </div>;
        else
            content = <div className="app-content">
                <span style={{float: "left"}}>Results for {this.state.searchTerm}:</span>
                {fileList}
            </div>;

        return (<div className={"App"}>
            <Banner/>
            <MenuBar onUpload={this.loadFromServer} onEmptySearch={this.loadFromServer}
                     search={this.searchByString}/>
            {content}
        </div>)
    }
}

ReactDOM.render(<App/>, document.getElementById('react'));
