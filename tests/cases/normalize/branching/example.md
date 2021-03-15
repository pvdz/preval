# Preval test case

# example.md

> Normalize > Branching > Example
>
> Just toying with the idea here

#TODO

## Input

`````js filename=intro
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
node.elements.forEach((anode, i) => {
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
const tmpCallObj = node.elements;
const tmpCallVal = tmpCallObj.forEach;
const tmpCalleeParam = function (anode, i) {
  if (anode) {
    let valueNode = anode;
    const tmpBinLhs = anode.type;
    const tmpIfTest = tmpBinLhs === 'SpreadElement';
    if (tmpIfTest) {
      valueNode = anode.argument;
      crumb(anode, 'argument', valueNode);
    }
    const tmpIfTest$1 = isComplexNode(valueNode);
    if (tmpIfTest$1) {
      const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
      const tmpCallObj$1 = assigns;
      const tmpCallVal$1 = tmpCallObj$1.push;
      const tmpCalleeParam$1 = AST.assignmentExpression(tmpName, valueNode);
      tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$1);
      const tmpCallObj$2 = newElements;
      const tmpCallVal$2 = tmpCallObj$2.push;
      let tmpCalleeParam$2 = undefined;
      const tmpBinLhs$1 = anode.type;
      const tmpIfTest$2 = tmpBinLhs$1 === 'SpreadElement';
      if (tmpIfTest$2) {
        tmpCalleeParam$2 = AST.spreadElement(tmpName);
      } else {
        tmpCalleeParam$2 = AST.identifier(tmpName);
      }
      tmpCallVal$2.call(tmpCallObj$2, tmpCalleeParam$2);
    } else {
      newElements.push(anode);
    }
    const tmpBinLhs$2 = anode.type;
    const tmpIfTest$3 = tmpBinLhs$2 === 'SpreadElement';
    if (tmpIfTest$3) {
      uncrumb(anode, 'argument', valueNode);
    }
  } else {
    const tmpReturnArg = newElements.push(null);
    return tmpReturnArg;
  }
};
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallObj = node.elements;
const tmpCallVal = tmpCallObj.forEach;
const tmpCalleeParam = function (anode, i) {
  if (anode) {
    let valueNode = anode;
    const tmpBinLhs = anode.type;
    const tmpIfTest = tmpBinLhs === 'SpreadElement';
    if (tmpIfTest) {
      valueNode = anode.argument;
      crumb(anode, 'argument', valueNode);
    }
    const tmpIfTest$1 = isComplexNode(valueNode);
    if (tmpIfTest$1) {
      const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
      const tmpCallObj$1 = assigns;
      const tmpCallVal$1 = tmpCallObj$1.push;
      const tmpCalleeParam$1 = AST.assignmentExpression(tmpName, valueNode);
      tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$1);
      const tmpCallObj$2 = newElements;
      const tmpCallVal$2 = tmpCallObj$2.push;
      let tmpCalleeParam$2 = undefined;
      const tmpBinLhs$1 = anode.type;
      const tmpIfTest$2 = tmpBinLhs$1 === 'SpreadElement';
      if (tmpIfTest$2) {
        tmpCalleeParam$2 = AST.spreadElement(tmpName);
      } else {
        tmpCalleeParam$2 = AST.identifier(tmpName);
      }
      tmpCallVal$2.call(tmpCallObj$2, tmpCalleeParam$2);
    } else {
      newElements.push(anode);
    }
    const tmpBinLhs$2 = anode.type;
    const tmpIfTest$3 = tmpBinLhs$2 === 'SpreadElement';
    if (tmpIfTest$3) {
      uncrumb(anode, 'argument', valueNode);
    }
  } else {
    const tmpReturnArg = newElements.push(null);
    return tmpReturnArg;
  }
};
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Globals

BAD@! Found 8 implicit global bindings:

node, crumb, isComplexNode, createFreshVarInCurrentRootScope, assigns, AST, newElements, uncrumb

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
