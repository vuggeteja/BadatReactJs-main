import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import policy from "../AppAsset/BadatPolicy.pdf";
import LoadingOverlay from "react-loading-overlay";

export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  state = { numPages: null, pageNumber: 1, load: true };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, load: false });
  };

  goToPrevPage = () => {
    if (this.state.pageNumber > 1) {
      this.setState((state) => ({
        pageNumber: state.pageNumber - 1,
      }));
    }
  };
  goToNextPage = () => {
    if (this.state.pageNumber < this.state.numPages) {
      this.setState((state) => ({
        pageNumber: state.pageNumber + 1,
      }));
    }
  };

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <nav
          style={{
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "5px",
          }}
        >
          <button onClick={this.goToPrevPage}>Prev</button>

          <button onClick={this.goToNextPage} style={{ float: "right" }}>
            Next
          </button>
        </nav>
        <LoadingOverlay active={this.state.load} spinner text="Loading...">
          <div>
            <Document file={policy} onLoadSuccess={this.onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} width={window.screen.width} />
            </Document>
          </div>
        </LoadingOverlay>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
