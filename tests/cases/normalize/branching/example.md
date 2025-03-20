# Preval test case

# example.md

> Normalize > Branching > Example
>
> Just toying with the idea here

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


## Settled


`````js filename=intro
undefined.elements;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.elements;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.elements;
throw "[Preval]: Can not reach here";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
