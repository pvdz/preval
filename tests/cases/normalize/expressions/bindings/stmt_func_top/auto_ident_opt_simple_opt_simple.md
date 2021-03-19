# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt simple opt simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: 1 } };

  let a = b?.x?.y;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: { y: 1 } };
  let a = b?.x?.y;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal = { y: 1 };
  let b = { x: tmpObjLitVal };
  let a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpObjLitVal$1, b$1, a$1, tmpChainRootProp$1, tmpIfTest$2) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function (tmpObjLitVal$4, b$4, a$4, tmpChainRootProp$4, tmpIfTest$6, tmpChainElementObject$4, tmpIfTest$7) {
      const tmpChainElementObject$5 = tmpChainElementObject$4.y;
      a$4 = tmpChainElementObject$5;
      const tmpReturnArg = tmpBranchingC$1(tmpObjLitVal$4, b$4, a$4, tmpChainRootProp$4, tmpIfTest$6, tmpChainElementObject$4, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpObjLitVal$5, b$5, a$5, tmpChainRootProp$5, tmpIfTest$8, tmpChainElementObject$6, tmpIfTest$9) {
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpObjLitVal$5,
        b$5,
        a$5,
        tmpChainRootProp$5,
        tmpIfTest$8,
        tmpChainElementObject$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpObjLitVal$6, b$6, a$6, tmpChainRootProp$6, tmpIfTest$10, tmpChainElementObject$7, tmpIfTest$11) {
      const tmpReturnArg$2 = tmpBranchingC(tmpObjLitVal$6, b$6, a$6, tmpChainRootProp$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        tmpObjLitVal$1,
        b$1,
        a$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        tmpObjLitVal$1,
        b$1,
        a$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpObjLitVal$2, b$2, a$2, tmpChainRootProp$2, tmpIfTest$4) {
    const tmpReturnArg$5 = tmpBranchingC(tmpObjLitVal$2, b$2, a$2, tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpObjLitVal$3, b$3, a$3, tmpChainRootProp$3, tmpIfTest$5) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
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
  const tmpIfTest = b != null;
  const tmpBranchingA = function (a$1, tmpChainRootProp$1) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$5 = tmpChainElementObject$2.y;
      $(tmpChainElementObject$5);
      return undefined;
    } else {
      $(a$1);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(undefined, b);
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
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
