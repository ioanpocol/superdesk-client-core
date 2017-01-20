import {EditorState, Modifier} from 'draft-js';

const spellchecker = (state = {}, action) => {
    switch (action.type) {
    case 'SPELLCHECKER_REPLACE_WORD':
        return replaceWord(state, action.payload);
    default:
        return state;
    }
};

/**
 * @ngdoc method
 * @name replaceWord
 * @param {Object} state
 * @param {String} word
 * @return {Object} returns new state
 * @description Replace the current word with the new selected one
 */
const replaceWord = (state, {word, newWord}) => {
    const {editorState} = state;

    const wordSelection = editorState.getSelection().merge({
        anchorOffset: word.offset,
        focusOffset: word.offset + word.text.length,
        hasFocus: true
    });

    var newState = Modifier.replaceText(editorState.getCurrentContent(), wordSelection, newWord);

    newState = EditorState.push(editorState, newState, 'spellchecker');

    return {...state, editorState: newState};
};

export default spellchecker;
