# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.x?.y);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = b?.x?.y);
};
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpChainRootProp$1, tmpIfTest$2) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function (tmpChainRootProp$4, tmpIfTest$6, tmpChainElementObject$4, tmpIfTest$7) {
      const tmpChainElementObject$5 = tmpChainElementObject$4.y;
      a = tmpChainElementObject$5;
      const tmpReturnArg$2 = tmpBranchingC$1(tmpChainRootProp$4, tmpIfTest$6, tmpChainElementObject$4, tmpIfTest$7);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpChainRootProp$5, tmpIfTest$8, tmpChainElementObject$6, tmpIfTest$9) {
      const tmpReturnArg$3 = tmpBranchingC$1(tmpChainRootProp$5, tmpIfTest$8, tmpChainElementObject$6, tmpIfTest$9);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpChainRootProp$6, tmpIfTest$10, tmpChainElementObject$7, tmpIfTest$11) {
      const tmpReturnArg$4 = tmpBranchingC(tmpChainRootProp$6, tmpIfTest$10);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpChainRootProp$1, tmpIfTest$2, tmpChainElementObject$2, tmpIfTest$3);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(tmpChainRootProp$1, tmpIfTest$2, tmpChainElementObject$2, tmpIfTest$3);
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function (tmpChainRootProp$2, tmpIfTest$4) {
    const tmpReturnArg$7 = tmpBranchingC(tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function (tmpChainRootProp$3, tmpIfTest$5) {
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
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
  a = undefined;
  const tmpIfTest = b != null;
  const tmpBranchingA = function (tmpChainRootProp$1) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$5 = tmpChainElementObject$2.y;
      a = tmpChainElementObject$5;
      const tmpReturnArg$2 = tmpBranchingC();
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = tmpBranchingC();
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingC = function () {
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(b);
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
