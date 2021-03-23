# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)?.[$("x")]?.[$("y")]);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b)?.[$('x')]?.[$('y')]);
};
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpChainRootCall$1 = $$0;
    let tmpChainElementCall$1 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$4 = $$0;
      let tmpChainElementCall$4 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpChainRootComputed$4 = $$3;
      let tmpChainElementObject$4 = $$4;
      let tmpIfTest$7 = $$5;
      debugger;
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$4[tmpChainRootComputed$5];
      a = tmpChainElementObject$5;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpChainRootCall$4,
        tmpChainElementCall$4,
        tmpIfTest$6,
        tmpChainRootComputed$4,
        tmpChainElementObject$4,
        tmpIfTest$7,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$5 = $$0;
      let tmpChainElementCall$5 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpChainRootComputed$6 = $$3;
      let tmpChainElementObject$6 = $$4;
      let tmpIfTest$9 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpChainRootCall$5,
        tmpChainElementCall$5,
        tmpIfTest$8,
        tmpChainRootComputed$6,
        tmpChainElementObject$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$6 = $$0;
      let tmpChainElementCall$6 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpChainRootComputed$7 = $$3;
      let tmpChainElementObject$7 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpReturnArg$4 = tmpBranchingC(tmpChainRootCall$6, tmpChainElementCall$6, tmpIfTest$10);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$2,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$2,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpChainRootCall$2 = $$0;
    let tmpChainElementCall$2 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpChainRootCall$3 = $$0;
    let tmpChainElementCall$3 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$9;
  }
};
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0) {
    const tmpChainElementCall$1 = $$0;
    debugger;
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$2[tmpChainRootComputed$5];
      a = tmpChainElementObject$5;
      const tmpReturnArg$2 = tmpBranchingC();
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = tmpBranchingC();
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
