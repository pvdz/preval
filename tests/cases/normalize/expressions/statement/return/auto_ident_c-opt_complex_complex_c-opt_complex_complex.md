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
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$2) {
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function (
      tmpReturnArg$4,
      tmpChainRootCall$4,
      tmpChainElementCall$4,
      tmpIfTest$6,
      tmpChainRootComputed$4,
      tmpChainElementObject$4,
      tmpIfTest$7,
    ) {
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$4[tmpChainRootComputed$5];
      tmpReturnArg$4 = tmpChainElementObject$5;
      const tmpReturnArg$7 = tmpBranchingC$1(
        tmpReturnArg$4,
        tmpChainRootCall$4,
        tmpChainElementCall$4,
        tmpIfTest$6,
        tmpChainRootComputed$4,
        tmpChainElementObject$4,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function (
      tmpReturnArg$5,
      tmpChainRootCall$5,
      tmpChainElementCall$5,
      tmpIfTest$8,
      tmpChainRootComputed$6,
      tmpChainElementObject$6,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$8 = tmpBranchingC$1(
        tmpReturnArg$5,
        tmpChainRootCall$5,
        tmpChainElementCall$5,
        tmpIfTest$8,
        tmpChainRootComputed$6,
        tmpChainElementObject$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$8;
    };
    const tmpBranchingC$1 = function (
      tmpReturnArg$6,
      tmpChainRootCall$6,
      tmpChainElementCall$6,
      tmpIfTest$10,
      tmpChainRootComputed$7,
      tmpChainElementObject$7,
      tmpIfTest$11,
    ) {
      const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$6, tmpChainRootCall$6, tmpChainElementCall$6, tmpIfTest$10);
      return tmpReturnArg$9;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$10 = tmpBranchingA$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$2,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$10;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$2,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function (tmpReturnArg$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$4) {
    const tmpReturnArg$12 = tmpBranchingC(tmpReturnArg$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$4);
    return tmpReturnArg$12;
  };
  const tmpBranchingC = function (tmpReturnArg$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$5) {
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$14 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$14;
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
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainElementCall$1) {
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$2[tmpChainRootComputed$5];
      return tmpChainElementObject$5;
    } else {
      return tmpReturnArg$1;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(undefined, tmpChainElementCall);
    return tmpReturnArg$13;
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
