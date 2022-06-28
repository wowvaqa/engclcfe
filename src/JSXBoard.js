import React from "react";
import assign from "lodash/assign";

import JXG from "jsxgraph";

export default class JSXBoard extends React.Component {
  static propTypes = {
    style: {},
    className: "",
    logic: [{}, ""],
    boardAttributes: {},
    jessieCode: false,
  };
  constructor(props) {
    super(props);
    this.id = "board_" + Math.random().toString(36).substr(2, 9);
    this.state = { board: null };
    this.defaultStyle = { width: 500, height: 500 };
    this.defauflboardAttributes = {};
  }

  // called right before child lifecycles, passes context object to all children
  getChildContext() {
    return { board: this.state.board };
  }

  // called only after initial render
  componentDidMount() {
    // now that div exists, create new JSXGraph board with it
    let attributes = {};
    Object.assign(
      attributes,
      this.defauflboardAttributes,
      this.props.boardAttributes || {}
    );
    let board = JXG.JSXGraph.initBoard(this.id, attributes);
    if (this.props.jessieCode) {
      board.jc.parse(this.props.logic);
    } else {
      this.props.logic(board);
    }
    this.setState({
      board: board,
    });
  }

  // called only if shouldComponentUpdate returns true
  // for rendering the JSXGraph board div and any child elements
  render() {
    let style = assign(this.defaultStyle, this.props.style || {});

    return (
      <div
        id={this.id}
        className={"jxgbox " + this.props.className}
        style={style}
      />
    );
  }
}
