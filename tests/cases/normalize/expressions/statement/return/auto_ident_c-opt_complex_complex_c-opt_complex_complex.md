# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)?.[$("x")]?.[$("y")];
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(b)?.[$('x')]?.[$('y')];
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
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$1 = $$0;
    let tmpChainRootCall$1 = $$1;
    let tmpChainElementCall$1 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpChainRootComputed$3 = $('x');
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$5 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$7 = $$0;
      let tmpChainRootCall$7 = $$1;
      let tmpChainElementCall$7 = $$2;
      let tmpIfTest$11 = $$3;
      let tmpChainRootComputed$7 = $$4;
      let tmpChainElementObject$7 = $$5;
      let tmpIfTest$13 = $$6;
      debugger;
      const tmpChainRootComputed$9 = $('y');
      const tmpChainElementObject$9 = tmpChainElementObject$7[tmpChainRootComputed$9];
      tmpReturnArg$7 = tmpChainElementObject$9;
      const tmpReturnArg$13 = tmpBranchingC$1(
        tmpReturnArg$7,
        tmpChainRootCall$7,
        tmpChainElementCall$7,
        tmpIfTest$11,
        tmpChainRootComputed$7,
        tmpChainElementObject$7,
        tmpIfTest$13,
      );
      return tmpReturnArg$13;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$9 = $$0;
      let tmpChainRootCall$9 = $$1;
      let tmpChainElementCall$9 = $$2;
      let tmpIfTest$15 = $$3;
      let tmpChainRootComputed$11 = $$4;
      let tmpChainElementObject$11 = $$5;
      let tmpIfTest$17 = $$6;
      debugger;
      const tmpReturnArg$15 = tmpBranchingC$1(
        tmpReturnArg$9,
        tmpChainRootCall$9,
        tmpChainElementCall$9,
        tmpIfTest$15,
        tmpChainRootComputed$11,
        tmpChainElementObject$11,
        tmpIfTest$17,
      );
      return tmpReturnArg$15;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$11 = $$0;
      let tmpChainRootCall$11 = $$1;
      let tmpChainElementCall$11 = $$2;
      let tmpIfTest$19 = $$3;
      let tmpChainRootComputed$13 = $$4;
      let tmpChainElementObject$13 = $$5;
      let tmpIfTest$21 = $$6;
      debugger;
      const tmpReturnArg$17 = tmpBranchingC(tmpReturnArg$11, tmpChainRootCall$11, tmpChainElementCall$11, tmpIfTest$19);
      return tmpReturnArg$17;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$19 = tmpBranchingA$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$3,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$5,
      );
      return tmpReturnArg$19;
    } else {
      const tmpReturnArg$21 = tmpBranchingB$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$3,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$5,
      );
      return tmpReturnArg$21;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootCall$3 = $$1;
    let tmpChainElementCall$3 = $$2;
    let tmpIfTest$7 = $$3;
    debugger;
    const tmpReturnArg$23 = tmpBranchingC(tmpReturnArg$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$7);
    return tmpReturnArg$23;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$5 = $$0;
    let tmpChainRootCall$5 = $$1;
    let tmpChainElementCall$5 = $$2;
    let tmpIfTest$9 = $$3;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$25 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$25;
  } else {
    const tmpReturnArg$27 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$27;
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
const tmpBranchingA = function ($$0) {
  const tmpChainElementCall$1 = $$0;
  debugger;
  const tmpChainRootComputed$3 = $('x');
  const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
  const tmpIfTest$5 = tmpChainElementObject$3 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$9 = $('y');
    const tmpChainElementObject$9 = tmpChainElementObject$3[tmpChainRootComputed$9];
    return tmpChainElementObject$9;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpReturnArg$25 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$25;
  } else {
    return undefined;
  }
};
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
