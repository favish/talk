import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import t from 'coral-framework/services/i18n';
import Slot from 'coral-framework/components/Slot';
import CKEditor from 'react-ckeditor-component';

// TODO: (kiwi) Need to adapt CSS classes post refactor to match the rest.

/**
 * An enhanced textarea to make comment drafts.
 */
export default class DraftArea extends React.Component {

  constructor(props) {
    super(props);
    if (props.editorCssUrl) {
      props.editorConfig.contentsCss = [props.editorCssUrl];
    }
  }

  renderCharCount() {
    const { value, maxCharCount } = this.props;
    const className = cn('talk-plugin-commentbox-char-count', {
      ['talk-plugin-commentbox-char-max']: value.length > maxCharCount,
    });
    const remaining = maxCharCount - value.length;

    return (
      <div className={className}>
        {remaining} {t('comment_box.characters_remaining')}
      </div>
    );
  }

  onChange = e => {
    // Send an 'event' up to parent
    this.props.onChange({
      target: { value: e.editor.getData() },
    });
  };

  render() {
    const {
      value,
      placeholder,
      id,
      disabled,
      rows,
      label,
      charCountEnable,
      maxCharCount,
      editorConfig,
    } = this.props;

    return (
      <div>
        <div className={'talk-plugin-commentbox-container'}>
          <label htmlFor={id} className="screen-reader-text" aria-hidden={true}>
            {label}
          </label>
          <CKEditor
            activeClass={'talk-plugin-commentbox-textarea'}
            config={{
              ...editorConfig,
              readOnly: disabled,
            }}
            content={value}
            placeholder={placeholder}
            id={id}
            events={{
              change: this.onChange,
            }}
            rows={rows}
            disabled={disabled}
          />
          <Slot fill="commentInputArea" />
        </div>
        {charCountEnable && maxCharCount > 0 && this.renderCharCount()}
      </div>
    );
  }
}

DraftArea.defaultProps = {
  rows: 3,
  // TODO - Use settings obtained from admin interface for allowedContent - MEA
  editorConfig: {
    allowedContent: {
      '*': { attributes: 'lang,dir', styles: false, classes: false },
      a: { attributes: 'href,hreflang', styles: false, classes: false },
      blockquote: { attributes: 'cite', styles: false, classes: false },
      cite: { attributes: false, styles: false, classes: false },
      code: { attributes: false, styles: false, classes: false },
      dd: { attributes: false, styles: false, classes: false },
      dl: { attributes: false, styles: false, classes: false },
      dt: { attributes: false, styles: false, classes: false },
      em: { attributes: false, styles: false, classes: false },
      li: { attributes: false, styles: false, classes: false },
      ol: { attributes: 'start,type', styles: false, classes: false },
      strong: { attributes: false, styles: false, classes: false },
      sub: { attributes: false, styles: false, classes: false },
      sup: { attributes: false, styles: false, classes: false },
      u: { attributes: false, styles: false, classes: false },
      ul: { attributes: 'type', styles: false, classes: false },
    },
    disableNativeSpellChecker: false,
    entities: false,
    language: 'en',
    pasteFromWordPromptCleanup: true,
    resize_enabled: false,
    toolbar: [
      {
        name: 'Formatting',
        items: ['Bold', 'Italic', 'Underline', 'Superscript', 'Subscript'],
      },
      { name: 'Links', items: ['Link', 'Unlink'] },
      {
        name: 'Lists',
        items: ['BulletedList', 'NumberedList'],
      },
      { name: 'Media', items: ['Blockquote'] },
      { name: 'Tools', items: ['Source'] },
      '/',
    ],
    removePlugins: 'tabletools,contextmenu,tableresize',
    title: 'Rich Text Editor, Comment field',
    contentsLangDirection: 'ltr',
    contentsCss: [],
  }
};

DraftArea.propTypes = {
  charCountEnable: PropTypes.bool,
  maxCharCount: PropTypes.number,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
};
