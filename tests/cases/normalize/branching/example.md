# Preval test case

# example.md

> Normalize > Branching > Example
>
> Just toying with the idea here

#TODO

## Input

`````js filename=intro
let createFreshVarInCurrentRootScope, assigns, AST, newElements, crumb, isComplexNode, uncrumb, node

node.elements.forEach((anode, i) => {
  // Elided elements are `null` here. Skip 'em
  if (!anode) return newElements.push(null);

  let valueNode = anode;
  if (anode.type === 'SpreadElement') {
    valueNode = anode.argument;
    crumb(anode, 'argument', valueNode);
  }

  if (isComplexNode(valueNode)) {
    const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
    assigns.push(AST.assignmentExpression(tmpName, valueNode));
    newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
  } else {
    // Use anode because if this was a spread then we'd want to keep it
    newElements.push(anode);
  }

  if (anode.type === 'SpreadElement') {
    uncrumb(anode, 'argument', valueNode);
  }
});
`````

`````js filename=step1
node.elements.forEach((anode, i) => {
  // Elided elements are `null` here. Skip 'em
  if (!anode) {
    return newElements.push(null);
  } else {
    let valueNode = anode;
    if (anode.type === 'SpreadElement') {
      valueNode = anode.argument;
      crumb(anode, 'argument', valueNode);

      if (isComplexNode(valueNode)) {
        const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
        assigns.push(AST.assignmentExpression(tmpName, valueNode));
        newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
        if (anode.type === 'SpreadElement') {
          uncrumb(anode, 'argument', valueNode);
        }
      } else {
        // Use anode because if this was a spread then we'd want to keep it
        newElements.push(anode);
        if (anode.type === 'SpreadElement') {
          uncrumb(anode, 'argument', valueNode);
        }
      }
    } else {
      if (isComplexNode(valueNode)) {
        const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
        assigns.push(AST.assignmentExpression(tmpName, valueNode));
        newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
        if (anode.type === 'SpreadElement') {
          uncrumb(anode, 'argument', valueNode);
        }
      } else {
        // Use anode because if this was a spread then we'd want to keep it
        newElements.push(anode);
        if (anode.type === 'SpreadElement') {
          uncrumb(anode, 'argument', valueNode);
        }
      }
    } 
  }
});
`````

`````js filename=step2
node.elements.forEach((anode, i) => {
  // Elided elements are `null` here. Skip 'em
  function a(newElements) {
    return newElements.push(null);
  }
  function b(assigns, valueNode, newElements, anode) {
    valueNode = anode.argument;
    crumb(anode, 'argument', valueNode);

    if (isComplexNode(valueNode)) {
      c(assigns, valueNode, newElements, anode);
    } else {
      d(newElements, anode, valueNode);
    }
  }
  function c(assigns, valueNode, newElements, anode) {
    const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
    assigns.push(AST.assignmentExpression(tmpName, valueNode));
    newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
    if (anode.type === 'SpreadElement') {
      e(valueNode, anode);
    }
  }
  function d(newElements, anode, valueNode) {
    // Use anode because if this was a spread then we'd want to keep it
    newElements.push(anode);
    if (anode.type === 'SpreadElement') {
      j();
    }
  }
  function j() {
    uncrumb(anode, 'argument', valueNode);
  }
  function e(valueNode, anode) {
    uncrumb(anode, 'argument', valueNode);
  }
  function f(valueNode) {
    if (isComplexNode(valueNode)) {
      g();
    } else {
      i();
    }
  }
  function g() {
    const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
    assigns.push(AST.assignmentExpression(tmpName, valueNode));
    newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
    if (anode.type === 'SpreadElement') {
      h();
    }
  }
  function h() {
    uncrumb(anode, 'argument', valueNode);
  }
  function i() {
    // Use anode because if this was a spread then we'd want to keep it
    newElements.push(anode);
    if (anode.type === 'SpreadElement') {
      j2();
    }
  }
  function j2() {
    uncrumb(anode, 'argument', valueNode);
  }

  function x(assigns, newElements, anode) {
    let valueNode = anode;
    if (anode.type === 'SpreadElement') {
      b(assigns, valueNode, newElements, anode);
    } else {
      f();
    }
  }

  if (!anode) {
    a(newElements);
  } else {
    x();
  }
});
`````

`````js filename=phase1-alt
function a(anode) {
  if (anode.type === 'SpreadElement') {
    uncrumb(anode, 'argument', -1);
  }
}
function b(valueNode, assigns, newElements, anode) {
  if (isComplexNode(valueNode)) {
    const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
    assigns.push(AST.assignmentExpression(tmpName, -1));
    newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
    a(anode);
  } else {
    // Use anode because if this was a spread then we'd want to keep it
    newElements.push(anode);
    a(anode);
  }
}

function c(anode, assigns, newElements) {
  let valueNode = anode;
  if (anode && anode.type === 'SpreadElement') {
    valueNode = anode.argument;
    crumb(anode, 'argument', valueNode);
    b(valueNode, assigns, newElements, anode);
  } else {
    b(valueNode, assigns, newElements, anode);
  }  
}

const d = (anode, i) => {
  // Elided elements are `null` here. Skip 'em
  if (anode) {
    c(anode, assigns, newElements);
  } else {
    newElements.push(null);
  }
};

node.elements.forEach(d);
`````

## Pre Normal

`````js filename=intro
let createFreshVarInCurrentRootScope, assigns, AST, newElements, crumb, isComplexNode, uncrumb, node;
node.elements.forEach(($$0, $$1) => {
  let anode = $$0;
  let i = $$1;
  debugger;
  if (!anode) return newElements.push(null);
  let valueNode = anode;
  if (anode.type === 'SpreadElement') {
    valueNode = anode.argument;
    crumb(anode, 'argument', valueNode);
  }
  if (isComplexNode(valueNode)) {
    const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
    assigns.push(AST.assignmentExpression(tmpName, valueNode));
    newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
  } else {
    newElements.push(anode);
  }
  if (anode.type === 'SpreadElement') {
    uncrumb(anode, 'argument', valueNode);
  }
});
`````

## Normalized

`````js filename=intro
let createFreshVarInCurrentRootScope = undefined;
let assigns = undefined;
let AST = undefined;
let newElements = undefined;
let crumb = undefined;
let isComplexNode = undefined;
let uncrumb = undefined;
let node = undefined;
const tmpCallObj = node.elements;
const tmpCallVal = tmpCallObj.forEach;
const tmpCalleeParam = function ($$0, $$1) {
  let anode = $$0;
  let i = $$1;
  debugger;
  const tmpBranchingA = function () {
    debugger;
    let valueNode$1 = anode;
    const tmpBinLhs$5 = anode.type;
    const tmpIfTest$7 = tmpBinLhs$5 === 'SpreadElement';
    const tmpBranchingA$1 = function () {
      debugger;
      valueNode$1 = anode.argument;
      crumb(anode, 'argument', valueNode$1);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      tmpIfTest$9 = isComplexNode(valueNode$1);
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpName$5 = createFreshVarInCurrentRootScope('tmpElement', true);
        const tmpCallObj$13 = assigns;
        const tmpCallVal$13 = tmpCallObj$13.push;
        const tmpCalleeParam$13 = AST.assignmentExpression(tmpName$5, valueNode$1);
        tmpCallVal$13.call(tmpCallObj$13, tmpCalleeParam$13);
        const tmpCallObj$15 = newElements;
        const tmpCallVal$15 = tmpCallObj$15.push;
        let tmpCalleeParam$15 = undefined;
        const tmpBinLhs$13 = anode.type;
        const tmpIfTest$17 = tmpBinLhs$13 === 'SpreadElement';
        const tmpBranchingA$5 = function () {
          debugger;
          tmpCalleeParam$15 = AST.spreadElement(tmpName$5);
          const tmpReturnArg$7 = tmpBranchingC$5();
          return tmpReturnArg$7;
        };
        const tmpBranchingB$5 = function () {
          debugger;
          tmpCalleeParam$15 = AST.identifier(tmpName$5);
          const tmpReturnArg$9 = tmpBranchingC$5();
          return tmpReturnArg$9;
        };
        const tmpBranchingC$5 = function () {
          debugger;
          tmpCallVal$15.call(tmpCallObj$15, tmpCalleeParam$15);
          const tmpReturnArg$11 = tmpBranchingC$3();
          return tmpReturnArg$11;
        };
        if (tmpIfTest$17) {
          const tmpReturnArg$13 = tmpBranchingA$5();
          return tmpReturnArg$13;
        } else {
          const tmpReturnArg$15 = tmpBranchingB$5();
          return tmpReturnArg$15;
        }
      };
      const tmpBranchingB$3 = function () {
        debugger;
        newElements.push(anode);
        const tmpReturnArg$17 = tmpBranchingC$3();
        return tmpReturnArg$17;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        tmpBinLhs$7 = anode.type;
        tmpIfTest$11 = tmpBinLhs$7 === 'SpreadElement';
        const tmpBranchingA$7 = function () {
          debugger;
          uncrumb(anode, 'argument', valueNode$1);
          const tmpReturnArg$19 = tmpBranchingC$7();
          return tmpReturnArg$19;
        };
        const tmpBranchingB$7 = function () {
          debugger;
          const tmpReturnArg$21 = tmpBranchingC$7();
          return tmpReturnArg$21;
        };
        const tmpBranchingC$7 = function () {
          debugger;
          const tmpReturnArg$23 = tmpBranchingC();
          return tmpReturnArg$23;
        };
        if (tmpIfTest$11) {
          const tmpReturnArg$25 = tmpBranchingA$7();
          return tmpReturnArg$25;
        } else {
          const tmpReturnArg$27 = tmpBranchingB$7();
          return tmpReturnArg$27;
        }
      };
      if (tmpIfTest$9) {
        const tmpReturnArg$29 = tmpBranchingA$3();
        return tmpReturnArg$29;
      } else {
        const tmpReturnArg$31 = tmpBranchingB$3();
        return tmpReturnArg$31;
      }
    };
    let tmpIfTest$9 = undefined;
    let tmpBinLhs$7 = undefined;
    let tmpIfTest$11 = undefined;
    if (tmpIfTest$7) {
      const tmpReturnArg$33 = tmpBranchingA$1();
      return tmpReturnArg$33;
    } else {
      const tmpReturnArg$35 = tmpBranchingB$1();
      return tmpReturnArg$35;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = newElements.push(null);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
  };
  if (anode) {
    const tmpReturnArg$37 = tmpBranchingA();
    return tmpReturnArg$37;
  } else {
    const tmpReturnArg$39 = tmpBranchingB();
    return tmpReturnArg$39;
  }
};
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
undefined.elements;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
