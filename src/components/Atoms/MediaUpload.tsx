import * as React from 'react';
import InputFeedback from "./InputFeedback"
import Label from "./Label"

export interface MediaUploadProps {
  id: string;
  label: string;
  error: any,
  value: string;
  onChange: (field: string, mediaId: string) => void;
}

export interface MediaUploadState {
  uploading: boolean;
  file?: File;
  error?: string;
}

export default class MediaUpload extends React.Component<
  MediaUploadProps,
  MediaUploadState
  > {
  state: MediaUploadState = { uploading: false };

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    this.setState({ file: file });

    let data = new FormData();
    data.append('file', file);



    this.setState({ error: undefined, uploading: true });

    fetch('/api/upload/image', {
      method: 'post',
      // headers: {
      //   "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      // },
      body: data
    }).then(response => response.text())
      .then(
        res => {
          console.log(res);
          this.setState({ error: undefined, uploading: false });
          this.props.onChange(this.props.id, encodeURI(res));
        },
        err => {
          this.setState({ error: err, uploading: false });
          // const message = toApiError(err);
          // this.setState({ error: message, progress: -1 });
          // ToasterInstance.show({
          //   message,
          //   iconName: 'danger',
          //   intent: 'danger',
          // });
        }
      );
  }

  handleRemoveImage = () => {
    this.props.onChange(this.props.id, '');
  }

  render() {
    const {
      id,
      label,
      error,
      value,
      onChange,
    } = this.props;
    return (
      <div>
           <Label htmlFor={id} error={error}>
            {label}
          </Label>
        <div className="flexbox">
          {this.props.value &&
            <a
              role="button"
              onClick={this.handleRemoveImage}
            >
              Remove
            </a>}
          <input
            type="file"
            onChange={this.handleFileChange}
            id={id}
          />
          <InputFeedback error={error} />
        </div>
        <style jsx>{`
          .flexbox {
            display:flex;
          }

        `}</style>
      </div>
    );
  }
}