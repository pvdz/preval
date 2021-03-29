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
  const tmpBranchingA = function ($$0, $$1) {
    let anode$1 = $$0;
    let i$1 = $$1;
    debugger;
    let valueNode$1 = anode$1;
    const tmpBinLhs$5 = anode$1.type;
    const tmpIfTest$7 = tmpBinLhs$5 === 'SpreadElement';
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let anode$7 = $$0;
      let i$7 = $$1;
      let valueNode$3 = $$2;
      let tmpBinLhs$11 = $$3;
      let tmpIfTest$15 = $$4;
      debugger;
      valueNode$3 = anode$7.argument;
      crumb(anode$7, 'argument', valueNode$3);
      const tmpReturnArg$3 = tmpBranchingC$1(anode$7, i$7, valueNode$3, tmpBinLhs$11, tmpIfTest$15);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let anode$9 = $$0;
      let i$9 = $$1;
      let valueNode$5 = $$2;
      let tmpBinLhs$13 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(anode$9, i$9, valueNode$5, tmpBinLhs$13, tmpIfTest$17);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let anode$11 = $$0;
      let i$11 = $$1;
      let valueNode$7 = $$2;
      let tmpBinLhs$15 = $$3;
      let tmpIfTest$19 = $$4;
      debugger;
      const tmpIfTest$21 = isComplexNode(valueNode$7);
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let anode$13 = $$0;
        let i$13 = $$1;
        let valueNode$9 = $$2;
        let tmpBinLhs$21 = $$3;
        let tmpIfTest$27 = $$4;
        let tmpIfTest$29 = $$5;
        debugger;
        const tmpName$5 = createFreshVarInCurrentRootScope('tmpElement', true);
        const tmpCallObj$13 = assigns;
        const tmpCallVal$13 = tmpCallObj$13.push;
        const tmpCalleeParam$13 = AST.assignmentExpression(tmpName$5, valueNode$9);
        tmpCallVal$13.call(tmpCallObj$13, tmpCalleeParam$13);
        const tmpCallObj$15 = newElements;
        const tmpCallVal$15 = tmpCallObj$15.push;
        let tmpCalleeParam$15 = undefined;
        const tmpBinLhs$23 = anode$13.type;
        const tmpIfTest$31 = tmpBinLhs$23 === 'SpreadElement';
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
          let anode$19 = $$0;
          let i$19 = $$1;
          let valueNode$15 = $$2;
          let tmpBinLhs$31 = $$3;
          let tmpIfTest$43 = $$4;
          let tmpIfTest$45 = $$5;
          let tmpName$7 = $$6;
          let tmpCallObj$17 = $$7;
          let tmpCallVal$17 = $$8;
          let tmpCalleeParam$17 = $$9;
          let tmpCallObj$19 = $$10;
          let tmpCallVal$19 = $$11;
          let tmpCalleeParam$19 = $$12;
          let tmpBinLhs$33 = $$13;
          let tmpIfTest$47 = $$14;
          debugger;
          tmpCalleeParam$19 = AST.spreadElement(tmpName$7);
          const tmpReturnArg$7 = tmpBranchingC$5(
            anode$19,
            i$19,
            valueNode$15,
            tmpBinLhs$31,
            tmpIfTest$43,
            tmpIfTest$45,
            tmpName$7,
            tmpCallObj$17,
            tmpCallVal$17,
            tmpCalleeParam$17,
            tmpCallObj$19,
            tmpCallVal$19,
            tmpCalleeParam$19,
            tmpBinLhs$33,
            tmpIfTest$47,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
          let anode$21 = $$0;
          let i$21 = $$1;
          let valueNode$17 = $$2;
          let tmpBinLhs$35 = $$3;
          let tmpIfTest$49 = $$4;
          let tmpIfTest$51 = $$5;
          let tmpName$9 = $$6;
          let tmpCallObj$21 = $$7;
          let tmpCallVal$21 = $$8;
          let tmpCalleeParam$21 = $$9;
          let tmpCallObj$23 = $$10;
          let tmpCallVal$23 = $$11;
          let tmpCalleeParam$23 = $$12;
          let tmpBinLhs$37 = $$13;
          let tmpIfTest$53 = $$14;
          debugger;
          tmpCalleeParam$23 = AST.identifier(tmpName$9);
          const tmpReturnArg$9 = tmpBranchingC$5(
            anode$21,
            i$21,
            valueNode$17,
            tmpBinLhs$35,
            tmpIfTest$49,
            tmpIfTest$51,
            tmpName$9,
            tmpCallObj$21,
            tmpCallVal$21,
            tmpCalleeParam$21,
            tmpCallObj$23,
            tmpCallVal$23,
            tmpCalleeParam$23,
            tmpBinLhs$37,
            tmpIfTest$53,
          );
          return tmpReturnArg$9;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
          let anode$23 = $$0;
          let i$23 = $$1;
          let valueNode$19 = $$2;
          let tmpBinLhs$39 = $$3;
          let tmpIfTest$55 = $$4;
          let tmpIfTest$57 = $$5;
          let tmpName$11 = $$6;
          let tmpCallObj$25 = $$7;
          let tmpCallVal$25 = $$8;
          let tmpCalleeParam$25 = $$9;
          let tmpCallObj$27 = $$10;
          let tmpCallVal$27 = $$11;
          let tmpCalleeParam$27 = $$12;
          let tmpBinLhs$41 = $$13;
          let tmpIfTest$59 = $$14;
          debugger;
          tmpCallVal$27.call(tmpCallObj$27, tmpCalleeParam$27);
          const tmpReturnArg$11 = tmpBranchingC$3(anode$23, i$23, valueNode$19, tmpBinLhs$39, tmpIfTest$55, tmpIfTest$57);
          return tmpReturnArg$11;
        };
        if (tmpIfTest$31) {
          const tmpReturnArg$13 = tmpBranchingA$5(
            anode$13,
            i$13,
            valueNode$9,
            tmpBinLhs$21,
            tmpIfTest$27,
            tmpIfTest$29,
            tmpName$5,
            tmpCallObj$13,
            tmpCallVal$13,
            tmpCalleeParam$13,
            tmpCallObj$15,
            tmpCallVal$15,
            tmpCalleeParam$15,
            tmpBinLhs$23,
            tmpIfTest$31,
          );
          return tmpReturnArg$13;
        } else {
          const tmpReturnArg$15 = tmpBranchingB$5(
            anode$13,
            i$13,
            valueNode$9,
            tmpBinLhs$21,
            tmpIfTest$27,
            tmpIfTest$29,
            tmpName$5,
            tmpCallObj$13,
            tmpCallVal$13,
            tmpCalleeParam$13,
            tmpCallObj$15,
            tmpCallVal$15,
            tmpCalleeParam$15,
            tmpBinLhs$23,
            tmpIfTest$31,
          );
          return tmpReturnArg$15;
        }
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let anode$15 = $$0;
        let i$15 = $$1;
        let valueNode$11 = $$2;
        let tmpBinLhs$25 = $$3;
        let tmpIfTest$33 = $$4;
        let tmpIfTest$35 = $$5;
        debugger;
        newElements.push(anode$15);
        const tmpReturnArg$17 = tmpBranchingC$3(anode$15, i$15, valueNode$11, tmpBinLhs$25, tmpIfTest$33, tmpIfTest$35);
        return tmpReturnArg$17;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let anode$17 = $$0;
        let i$17 = $$1;
        let valueNode$13 = $$2;
        let tmpBinLhs$27 = $$3;
        let tmpIfTest$37 = $$4;
        let tmpIfTest$39 = $$5;
        debugger;
        const tmpBinLhs$29 = anode$17.type;
        const tmpIfTest$41 = tmpBinLhs$29 === 'SpreadElement';
        const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let anode$25 = $$0;
          let i$25 = $$1;
          let valueNode$21 = $$2;
          let tmpBinLhs$43 = $$3;
          let tmpIfTest$61 = $$4;
          let tmpIfTest$63 = $$5;
          let tmpBinLhs$45 = $$6;
          let tmpIfTest$65 = $$7;
          debugger;
          uncrumb(anode$25, 'argument', valueNode$21);
          const tmpReturnArg$19 = tmpBranchingC$7(
            anode$25,
            i$25,
            valueNode$21,
            tmpBinLhs$43,
            tmpIfTest$61,
            tmpIfTest$63,
            tmpBinLhs$45,
            tmpIfTest$65,
          );
          return tmpReturnArg$19;
        };
        const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let anode$27 = $$0;
          let i$27 = $$1;
          let valueNode$23 = $$2;
          let tmpBinLhs$47 = $$3;
          let tmpIfTest$67 = $$4;
          let tmpIfTest$69 = $$5;
          let tmpBinLhs$49 = $$6;
          let tmpIfTest$71 = $$7;
          debugger;
          const tmpReturnArg$21 = tmpBranchingC$7(
            anode$27,
            i$27,
            valueNode$23,
            tmpBinLhs$47,
            tmpIfTest$67,
            tmpIfTest$69,
            tmpBinLhs$49,
            tmpIfTest$71,
          );
          return tmpReturnArg$21;
        };
        const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let anode$29 = $$0;
          let i$29 = $$1;
          let valueNode$25 = $$2;
          let tmpBinLhs$51 = $$3;
          let tmpIfTest$73 = $$4;
          let tmpIfTest$75 = $$5;
          let tmpBinLhs$53 = $$6;
          let tmpIfTest$77 = $$7;
          debugger;
          const tmpReturnArg$23 = tmpBranchingC(anode$29, i$29);
          return tmpReturnArg$23;
        };
        if (tmpIfTest$41) {
          const tmpReturnArg$25 = tmpBranchingA$7(
            anode$17,
            i$17,
            valueNode$13,
            tmpBinLhs$27,
            tmpIfTest$37,
            tmpIfTest$39,
            tmpBinLhs$29,
            tmpIfTest$41,
          );
          return tmpReturnArg$25;
        } else {
          const tmpReturnArg$27 = tmpBranchingB$7(
            anode$17,
            i$17,
            valueNode$13,
            tmpBinLhs$27,
            tmpIfTest$37,
            tmpIfTest$39,
            tmpBinLhs$29,
            tmpIfTest$41,
          );
          return tmpReturnArg$27;
        }
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$29 = tmpBranchingA$3(anode$11, i$11, valueNode$7, tmpBinLhs$15, tmpIfTest$19, tmpIfTest$21);
        return tmpReturnArg$29;
      } else {
        const tmpReturnArg$31 = tmpBranchingB$3(anode$11, i$11, valueNode$7, tmpBinLhs$15, tmpIfTest$19, tmpIfTest$21);
        return tmpReturnArg$31;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$33 = tmpBranchingA$1(anode$1, i$1, valueNode$1, tmpBinLhs$5, tmpIfTest$7);
      return tmpReturnArg$33;
    } else {
      const tmpReturnArg$35 = tmpBranchingB$1(anode$1, i$1, valueNode$1, tmpBinLhs$5, tmpIfTest$7);
      return tmpReturnArg$35;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let anode$3 = $$0;
    let i$3 = $$1;
    debugger;
    const tmpReturnArg$1 = newElements.push(null);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let anode$5 = $$0;
    let i$5 = $$1;
    debugger;
  };
  if (anode) {
    const tmpReturnArg$37 = tmpBranchingA(anode, i);
    return tmpReturnArg$37;
  } else {
    const tmpReturnArg$39 = tmpBranchingB(anode, i);
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
