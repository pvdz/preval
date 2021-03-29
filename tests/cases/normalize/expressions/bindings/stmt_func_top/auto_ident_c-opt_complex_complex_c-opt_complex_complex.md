# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: 1 } };

  let a = $(b)?.[$("x")]?.[$("y")];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: { y: 1 } };
  let a = $(b)?.[$('x')]?.[$('y')];
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal = { y: 1 };
  let b = { x: tmpObjLitVal };
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$1 = $$0;
    let b$1 = $$1;
    let a$1 = $$2;
    let tmpChainRootCall$1 = $$3;
    let tmpChainElementCall$1 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    const tmpChainRootComputed$3 = $('x');
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$5 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$7 = $$0;
      let b$7 = $$1;
      let a$7 = $$2;
      let tmpChainRootCall$7 = $$3;
      let tmpChainElementCall$7 = $$4;
      let tmpIfTest$11 = $$5;
      let tmpChainRootComputed$7 = $$6;
      let tmpChainElementObject$7 = $$7;
      let tmpIfTest$13 = $$8;
      debugger;
      const tmpChainRootComputed$9 = $('y');
      const tmpChainElementObject$9 = tmpChainElementObject$7[tmpChainRootComputed$9];
      a$7 = tmpChainElementObject$9;
      const tmpReturnArg = tmpBranchingC$1(
        tmpObjLitVal$7,
        b$7,
        a$7,
        tmpChainRootCall$7,
        tmpChainElementCall$7,
        tmpIfTest$11,
        tmpChainRootComputed$7,
        tmpChainElementObject$7,
        tmpIfTest$13,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$9 = $$0;
      let b$9 = $$1;
      let a$9 = $$2;
      let tmpChainRootCall$9 = $$3;
      let tmpChainElementCall$9 = $$4;
      let tmpIfTest$15 = $$5;
      let tmpChainRootComputed$11 = $$6;
      let tmpChainElementObject$11 = $$7;
      let tmpIfTest$17 = $$8;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpObjLitVal$9,
        b$9,
        a$9,
        tmpChainRootCall$9,
        tmpChainElementCall$9,
        tmpIfTest$15,
        tmpChainRootComputed$11,
        tmpChainElementObject$11,
        tmpIfTest$17,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$11 = $$0;
      let b$11 = $$1;
      let a$11 = $$2;
      let tmpChainRootCall$11 = $$3;
      let tmpChainElementCall$11 = $$4;
      let tmpIfTest$19 = $$5;
      let tmpChainRootComputed$13 = $$6;
      let tmpChainElementObject$13 = $$7;
      let tmpIfTest$21 = $$8;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpObjLitVal$11, b$11, a$11, tmpChainRootCall$11, tmpChainElementCall$11, tmpIfTest$19);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpObjLitVal$1,
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$3,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$5,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(
        tmpObjLitVal$1,
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$3,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$5,
      );
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$3 = $$0;
    let b$3 = $$1;
    let a$3 = $$2;
    let tmpChainRootCall$3 = $$3;
    let tmpChainElementCall$3 = $$4;
    let tmpIfTest$7 = $$5;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpObjLitVal$3, b$3, a$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$7);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$5 = $$0;
    let b$5 = $$1;
    let a$5 = $$2;
    let tmpChainRootCall$5 = $$3;
    let tmpChainElementCall$5 = $$4;
    let tmpIfTest$9 = $$5;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpObjLitVal, b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpObjLitVal, b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingA = function ($$0) {
  const tmpChainElementCall$1 = $$0;
  debugger;
  const tmpChainRootComputed$3 = $('x');
  const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
  const tmpIfTest$5 = tmpChainElementObject$3 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$9 = $('y');
    const tmpChainElementObject$9 = tmpChainElementObject$3[tmpChainRootComputed$9];
    $(tmpChainElementObject$9);
    return undefined;
  } else {
    $(undefined);
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpObjLitVal = { y: 1 };
  const b = { x: tmpObjLitVal };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$11;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
