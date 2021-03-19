# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: 1 } };

  let a = { a: 999, b: 1000 };
  $(b)?.[$("x")]?.[$("y")];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: { y: 1 } };
  let a = { a: 999, b: 1000 };
  $(b)?.[$('x')]?.[$('y')];
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal = { y: 1 };
  let b = { x: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpObjLitVal$1, b$1, a$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$2) {
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function (
      tmpObjLitVal$4,
      b$4,
      a$4,
      tmpChainRootCall$4,
      tmpChainElementCall$4,
      tmpIfTest$6,
      tmpChainRootComputed$4,
      tmpChainElementObject$4,
      tmpIfTest$7,
    ) {
      const tmpChainRootComputed$5 = $('y');
      const tmpChainElementObject$5 = tmpChainElementObject$4[tmpChainRootComputed$5];
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
    const tmpBranchingB$1 = function (
      tmpObjLitVal$5,
      b$5,
      a$5,
      tmpChainRootCall$5,
      tmpChainElementCall$5,
      tmpIfTest$8,
      tmpChainRootComputed$6,
      tmpChainElementObject$6,
      tmpIfTest$9,
    ) {
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
    const tmpBranchingC$1 = function (
      tmpObjLitVal$6,
      b$6,
      a$6,
      tmpChainRootCall$6,
      tmpChainElementCall$6,
      tmpIfTest$10,
      tmpChainRootComputed$7,
      tmpChainElementObject$7,
      tmpIfTest$11,
    ) {
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
  const tmpBranchingB = function (tmpObjLitVal$2, b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$4) {
    const tmpReturnArg$5 = tmpBranchingC(tmpObjLitVal$2, b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpObjLitVal$3, b$3, a$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$5) {
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
  const tmpObjLitVal = { y: 1 };
  const b = { x: tmpObjLitVal };
  const a = { a: 999, b: 1000 };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (a$1, tmpChainElementCall$1) {
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$5 = $('y');
      tmpChainElementObject$2[tmpChainRootComputed$5];
      $(a$1);
      return undefined;
    } else {
      $(a$1);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpChainElementCall);
    return tmpReturnArg$6;
  } else {
    $(a);
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
 - 4: { a: '999', b: '1000' }
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
