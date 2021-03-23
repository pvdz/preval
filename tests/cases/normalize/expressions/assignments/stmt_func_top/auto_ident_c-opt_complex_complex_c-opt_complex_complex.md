# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: 1 } };

  let a = { a: 999, b: 1000 };
  a = $(b)?.[$("x")]?.[$("y")];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: { y: 1 } };
  let a = { a: 999, b: 1000 };
  a = $(b)?.[$('x')]?.[$('y')];
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
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$1 = $$0;
    let b$1 = $$1;
    let a$1 = $$2;
    let tmpChainRootCall$1 = $$3;
    let tmpChainElementCall$1 = $$4;
    let tmpIfTest$2 = $$5;
    debugger;
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$4 = $$0;
      let b$4 = $$1;
      let a$4 = $$2;
      let tmpChainRootCall$4 = $$3;
      let tmpChainElementCall$4 = $$4;
      let tmpIfTest$6 = $$5;
      let tmpChainRootComputed$4 = $$6;
      let tmpChainElementObject$4 = $$7;
      let tmpIfTest$7 = $$8;
      debugger;
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$4[tmpChainRootComputed$5];
      a$4 = tmpChainElementObject$5;
      const tmpReturnArg = tmpBranchingC$1(
        tmpObjLitVal$4,
        b$4,
        a$4,
        tmpChainRootCall$4,
        tmpChainElementCall$4,
        tmpIfTest$6,
        tmpChainRootComputed$4,
        tmpChainElementObject$4,
        tmpIfTest$7,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$5 = $$0;
      let b$5 = $$1;
      let a$5 = $$2;
      let tmpChainRootCall$5 = $$3;
      let tmpChainElementCall$5 = $$4;
      let tmpIfTest$8 = $$5;
      let tmpChainRootComputed$6 = $$6;
      let tmpChainElementObject$6 = $$7;
      let tmpIfTest$9 = $$8;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpObjLitVal$5,
        b$5,
        a$5,
        tmpChainRootCall$5,
        tmpChainElementCall$5,
        tmpIfTest$8,
        tmpChainRootComputed$6,
        tmpChainElementObject$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$6 = $$0;
      let b$6 = $$1;
      let a$6 = $$2;
      let tmpChainRootCall$6 = $$3;
      let tmpChainElementCall$6 = $$4;
      let tmpIfTest$10 = $$5;
      let tmpChainRootComputed$7 = $$6;
      let tmpChainElementObject$7 = $$7;
      let tmpIfTest$11 = $$8;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC(tmpObjLitVal$6, b$6, a$6, tmpChainRootCall$6, tmpChainElementCall$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        tmpObjLitVal$1,
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$2,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        tmpObjLitVal$1,
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$2,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$2 = $$0;
    let b$2 = $$1;
    let a$2 = $$2;
    let tmpChainRootCall$2 = $$3;
    let tmpChainElementCall$2 = $$4;
    let tmpIfTest$4 = $$5;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpObjLitVal$2, b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$3 = $$0;
    let b$3 = $$1;
    let a$3 = $$2;
    let tmpChainRootCall$3 = $$3;
    let tmpChainElementCall$3 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpObjLitVal, b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpObjLitVal, b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal = { y: 1 };
  const b = { x: tmpObjLitVal };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1) {
    const a$1 = $$0;
    const tmpChainElementCall$1 = $$1;
    debugger;
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$2[tmpChainRootComputed$5];
      $(tmpChainElementObject$5);
      return undefined;
    } else {
      $(a$1);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(undefined, tmpChainElementCall);
    return tmpReturnArg$6;
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
