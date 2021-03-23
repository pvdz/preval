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
    const tmpBinLhs$3 = anode$1.type;
    const tmpIfTest$4 = tmpBinLhs$3 === 'SpreadElement';
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let anode$4 = $$0;
      let i$4 = $$1;
      let valueNode$2 = $$2;
      let tmpBinLhs$6 = $$3;
      let tmpIfTest$8 = $$4;
      debugger;
      valueNode$2 = anode$4.argument;
      crumb(anode$4, 'argument', valueNode$2);
      const tmpReturnArg$2 = tmpBranchingC$1(anode$4, i$4, valueNode$2, tmpBinLhs$6, tmpIfTest$8);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let anode$5 = $$0;
      let i$5 = $$1;
      let valueNode$3 = $$2;
      let tmpBinLhs$7 = $$3;
      let tmpIfTest$9 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(anode$5, i$5, valueNode$3, tmpBinLhs$7, tmpIfTest$9);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let anode$6 = $$0;
      let i$6 = $$1;
      let valueNode$4 = $$2;
      let tmpBinLhs$8 = $$3;
      let tmpIfTest$10 = $$4;
      debugger;
      const tmpIfTest$11 = isComplexNode(valueNode$4);
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let anode$7 = $$0;
        let i$7 = $$1;
        let valueNode$5 = $$2;
        let tmpBinLhs$11 = $$3;
        let tmpIfTest$14 = $$4;
        let tmpIfTest$15 = $$5;
        debugger;
        const tmpName$3 = createFreshVarInCurrentRootScope('tmpElement', true);
        const tmpCallObj$7 = assigns;
        const tmpCallVal$7 = tmpCallObj$7.push;
        const tmpCalleeParam$7 = AST.assignmentExpression(tmpName$3, valueNode$5);
        tmpCallVal$7.call(tmpCallObj$7, tmpCalleeParam$7);
        const tmpCallObj$8 = newElements;
        const tmpCallVal$8 = tmpCallObj$8.push;
        let tmpCalleeParam$8 = undefined;
        const tmpBinLhs$12 = anode$7.type;
        const tmpIfTest$16 = tmpBinLhs$12 === 'SpreadElement';
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
          let anode$10 = $$0;
          let i$10 = $$1;
          let valueNode$8 = $$2;
          let tmpBinLhs$16 = $$3;
          let tmpIfTest$22 = $$4;
          let tmpIfTest$23 = $$5;
          let tmpName$4 = $$6;
          let tmpCallObj$9 = $$7;
          let tmpCallVal$9 = $$8;
          let tmpCalleeParam$9 = $$9;
          let tmpCallObj$10 = $$10;
          let tmpCallVal$10 = $$11;
          let tmpCalleeParam$10 = $$12;
          let tmpBinLhs$17 = $$13;
          let tmpIfTest$24 = $$14;
          debugger;
          tmpCalleeParam$10 = AST.spreadElement(tmpName$4);
          const tmpReturnArg$4 = tmpBranchingC$3(
            anode$10,
            i$10,
            valueNode$8,
            tmpBinLhs$16,
            tmpIfTest$22,
            tmpIfTest$23,
            tmpName$4,
            tmpCallObj$9,
            tmpCallVal$9,
            tmpCalleeParam$9,
            tmpCallObj$10,
            tmpCallVal$10,
            tmpCalleeParam$10,
            tmpBinLhs$17,
            tmpIfTest$24,
          );
          return tmpReturnArg$4;
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
          let anode$11 = $$0;
          let i$11 = $$1;
          let valueNode$9 = $$2;
          let tmpBinLhs$18 = $$3;
          let tmpIfTest$25 = $$4;
          let tmpIfTest$26 = $$5;
          let tmpName$5 = $$6;
          let tmpCallObj$11 = $$7;
          let tmpCallVal$11 = $$8;
          let tmpCalleeParam$11 = $$9;
          let tmpCallObj$12 = $$10;
          let tmpCallVal$12 = $$11;
          let tmpCalleeParam$12 = $$12;
          let tmpBinLhs$19 = $$13;
          let tmpIfTest$27 = $$14;
          debugger;
          tmpCalleeParam$12 = AST.identifier(tmpName$5);
          const tmpReturnArg$5 = tmpBranchingC$3(
            anode$11,
            i$11,
            valueNode$9,
            tmpBinLhs$18,
            tmpIfTest$25,
            tmpIfTest$26,
            tmpName$5,
            tmpCallObj$11,
            tmpCallVal$11,
            tmpCalleeParam$11,
            tmpCallObj$12,
            tmpCallVal$12,
            tmpCalleeParam$12,
            tmpBinLhs$19,
            tmpIfTest$27,
          );
          return tmpReturnArg$5;
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11, $$12, $$13, $$14) {
          let anode$12 = $$0;
          let i$12 = $$1;
          let valueNode$10 = $$2;
          let tmpBinLhs$20 = $$3;
          let tmpIfTest$28 = $$4;
          let tmpIfTest$29 = $$5;
          let tmpName$6 = $$6;
          let tmpCallObj$13 = $$7;
          let tmpCallVal$13 = $$8;
          let tmpCalleeParam$13 = $$9;
          let tmpCallObj$14 = $$10;
          let tmpCallVal$14 = $$11;
          let tmpCalleeParam$14 = $$12;
          let tmpBinLhs$21 = $$13;
          let tmpIfTest$30 = $$14;
          debugger;
          tmpCallVal$14.call(tmpCallObj$14, tmpCalleeParam$14);
          const tmpReturnArg$6 = tmpBranchingC$2(anode$12, i$12, valueNode$10, tmpBinLhs$20, tmpIfTest$28, tmpIfTest$29);
          return tmpReturnArg$6;
        };
        if (tmpIfTest$16) {
          const tmpReturnArg$7 = tmpBranchingA$3(
            anode$7,
            i$7,
            valueNode$5,
            tmpBinLhs$11,
            tmpIfTest$14,
            tmpIfTest$15,
            tmpName$3,
            tmpCallObj$7,
            tmpCallVal$7,
            tmpCalleeParam$7,
            tmpCallObj$8,
            tmpCallVal$8,
            tmpCalleeParam$8,
            tmpBinLhs$12,
            tmpIfTest$16,
          );
          return tmpReturnArg$7;
        } else {
          const tmpReturnArg$8 = tmpBranchingB$3(
            anode$7,
            i$7,
            valueNode$5,
            tmpBinLhs$11,
            tmpIfTest$14,
            tmpIfTest$15,
            tmpName$3,
            tmpCallObj$7,
            tmpCallVal$7,
            tmpCalleeParam$7,
            tmpCallObj$8,
            tmpCallVal$8,
            tmpCalleeParam$8,
            tmpBinLhs$12,
            tmpIfTest$16,
          );
          return tmpReturnArg$8;
        }
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let anode$8 = $$0;
        let i$8 = $$1;
        let valueNode$6 = $$2;
        let tmpBinLhs$13 = $$3;
        let tmpIfTest$17 = $$4;
        let tmpIfTest$18 = $$5;
        debugger;
        newElements.push(anode$8);
        const tmpReturnArg$9 = tmpBranchingC$2(anode$8, i$8, valueNode$6, tmpBinLhs$13, tmpIfTest$17, tmpIfTest$18);
        return tmpReturnArg$9;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let anode$9 = $$0;
        let i$9 = $$1;
        let valueNode$7 = $$2;
        let tmpBinLhs$14 = $$3;
        let tmpIfTest$19 = $$4;
        let tmpIfTest$20 = $$5;
        debugger;
        const tmpBinLhs$15 = anode$9.type;
        const tmpIfTest$21 = tmpBinLhs$15 === 'SpreadElement';
        const tmpBranchingA$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let anode$13 = $$0;
          let i$13 = $$1;
          let valueNode$11 = $$2;
          let tmpBinLhs$22 = $$3;
          let tmpIfTest$31 = $$4;
          let tmpIfTest$32 = $$5;
          let tmpBinLhs$23 = $$6;
          let tmpIfTest$33 = $$7;
          debugger;
          uncrumb(anode$13, 'argument', valueNode$11);
          const tmpReturnArg$10 = tmpBranchingC$4(
            anode$13,
            i$13,
            valueNode$11,
            tmpBinLhs$22,
            tmpIfTest$31,
            tmpIfTest$32,
            tmpBinLhs$23,
            tmpIfTest$33,
          );
          return tmpReturnArg$10;
        };
        const tmpBranchingB$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let anode$14 = $$0;
          let i$14 = $$1;
          let valueNode$12 = $$2;
          let tmpBinLhs$24 = $$3;
          let tmpIfTest$34 = $$4;
          let tmpIfTest$35 = $$5;
          let tmpBinLhs$25 = $$6;
          let tmpIfTest$36 = $$7;
          debugger;
          const tmpReturnArg$11 = tmpBranchingC$4(
            anode$14,
            i$14,
            valueNode$12,
            tmpBinLhs$24,
            tmpIfTest$34,
            tmpIfTest$35,
            tmpBinLhs$25,
            tmpIfTest$36,
          );
          return tmpReturnArg$11;
        };
        const tmpBranchingC$4 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let anode$15 = $$0;
          let i$15 = $$1;
          let valueNode$13 = $$2;
          let tmpBinLhs$26 = $$3;
          let tmpIfTest$37 = $$4;
          let tmpIfTest$38 = $$5;
          let tmpBinLhs$27 = $$6;
          let tmpIfTest$39 = $$7;
          debugger;
          const tmpReturnArg$12 = tmpBranchingC(anode$15, i$15);
          return tmpReturnArg$12;
        };
        if (tmpIfTest$21) {
          const tmpReturnArg$13 = tmpBranchingA$4(
            anode$9,
            i$9,
            valueNode$7,
            tmpBinLhs$14,
            tmpIfTest$19,
            tmpIfTest$20,
            tmpBinLhs$15,
            tmpIfTest$21,
          );
          return tmpReturnArg$13;
        } else {
          const tmpReturnArg$14 = tmpBranchingB$4(
            anode$9,
            i$9,
            valueNode$7,
            tmpBinLhs$14,
            tmpIfTest$19,
            tmpIfTest$20,
            tmpBinLhs$15,
            tmpIfTest$21,
          );
          return tmpReturnArg$14;
        }
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$15 = tmpBranchingA$2(anode$6, i$6, valueNode$4, tmpBinLhs$8, tmpIfTest$10, tmpIfTest$11);
        return tmpReturnArg$15;
      } else {
        const tmpReturnArg$16 = tmpBranchingB$2(anode$6, i$6, valueNode$4, tmpBinLhs$8, tmpIfTest$10, tmpIfTest$11);
        return tmpReturnArg$16;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$17 = tmpBranchingA$1(anode$1, i$1, valueNode$1, tmpBinLhs$3, tmpIfTest$4);
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$18 = tmpBranchingB$1(anode$1, i$1, valueNode$1, tmpBinLhs$3, tmpIfTest$4);
      return tmpReturnArg$18;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let anode$2 = $$0;
    let i$2 = $$1;
    debugger;
    const tmpReturnArg$1 = newElements.push(null);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let anode$3 = $$0;
    let i$3 = $$1;
    debugger;
  };
  if (anode) {
    const tmpReturnArg$19 = tmpBranchingA(anode, i);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$20 = tmpBranchingB(anode, i);
    return tmpReturnArg$20;
  }
};
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallObj = node.elements;
const tmpCallVal = tmpCallObj.forEach;
const tmpCalleeParam = function ($$0, $$1) {
  const anode = $$0;
  debugger;
  const tmpBranchingA = function ($$0) {
    const anode$1 = $$0;
    debugger;
    const tmpBinLhs$3 = anode$1.type;
    const tmpIfTest$4 = tmpBinLhs$3 === 'SpreadElement';
    const tmpBranchingC$1 = function ($$0, $$1) {
      const anode$6 = $$0;
      const valueNode$4 = $$1;
      debugger;
      const tmpIfTest$11 = isComplexNode(valueNode$4);
      const tmpBranchingA$2 = function ($$0, $$1) {
        const anode$7 = $$0;
        const valueNode$5 = $$1;
        debugger;
        const tmpName$3 = createFreshVarInCurrentRootScope('tmpElement', true);
        const tmpCallObj$7 = assigns;
        const tmpCallVal$7 = tmpCallObj$7.push;
        const tmpCalleeParam$7 = AST.assignmentExpression(tmpName$3, valueNode$5);
        tmpCallVal$7.call(tmpCallObj$7, tmpCalleeParam$7);
        const tmpCallObj$8 = newElements;
        const tmpCallVal$8 = tmpCallObj$8.push;
        const tmpBinLhs$12 = anode$7.type;
        const tmpIfTest$16 = tmpBinLhs$12 === 'SpreadElement';
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4) {
          const anode$12 = $$0;
          const valueNode$10 = $$1;
          const tmpCallObj$14 = $$2;
          const tmpCallVal$14 = $$3;
          const tmpCalleeParam$14 = $$4;
          debugger;
          tmpCallVal$14.call(tmpCallObj$14, tmpCalleeParam$14);
          const tmpReturnArg$6 = tmpBranchingC$2(anode$12, valueNode$10);
          return tmpReturnArg$6;
        };
        if (tmpIfTest$16) {
          const SSA_tmpCalleeParam$10 = AST.spreadElement(tmpName$3);
          const tmpReturnArg$4 = tmpBranchingC$3(anode$7, valueNode$5, tmpCallObj$8, tmpCallVal$8, SSA_tmpCalleeParam$10);
          return tmpReturnArg$4;
        } else {
          const SSA_tmpCalleeParam$12 = AST.identifier(tmpName$3);
          const tmpReturnArg$5 = tmpBranchingC$3(anode$7, valueNode$5, tmpCallObj$8, tmpCallVal$8, SSA_tmpCalleeParam$12);
          return tmpReturnArg$5;
        }
      };
      const tmpBranchingC$2 = function ($$0, $$1) {
        const anode$9 = $$0;
        const valueNode$7 = $$1;
        debugger;
        const tmpBinLhs$15 = anode$9.type;
        const tmpIfTest$21 = tmpBinLhs$15 === 'SpreadElement';
        if (tmpIfTest$21) {
          uncrumb(anode$9, 'argument', valueNode$7);
          return undefined;
        } else {
          return undefined;
        }
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$15 = tmpBranchingA$2(anode$6, valueNode$4);
        return tmpReturnArg$15;
      } else {
        newElements.push(anode$6);
        const tmpReturnArg$9 = tmpBranchingC$2(anode$6, valueNode$4);
        return tmpReturnArg$9;
      }
    };
    if (tmpIfTest$4) {
      const SSA_valueNode$2 = anode$1.argument;
      crumb(anode$1, 'argument', SSA_valueNode$2);
      const tmpReturnArg$2 = tmpBranchingC$1(anode$1, SSA_valueNode$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$18 = tmpBranchingC$1(anode$1, anode$1);
      return tmpReturnArg$18;
    }
  };
  if (anode) {
    const tmpReturnArg$19 = tmpBranchingA(anode);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$20 = newElements.push(null);
    return tmpReturnArg$20;
  }
};
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Globals

BAD@! Found 8 implicit global bindings:

node, isComplexNode, createFreshVarInCurrentRootScope, assigns, AST, newElements, uncrumb, crumb

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
