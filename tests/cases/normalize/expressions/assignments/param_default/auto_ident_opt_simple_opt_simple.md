# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.x?.y)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = b?.x?.y) : tmpParamDefault;
};
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$3) {
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootProp$1 = b;
    const tmpIfTest$4 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$8, tmpNestedComplexRhs$2, tmpChainRootProp$2, tmpIfTest$9) {
      const tmpChainElementObject$4 = tmpChainRootProp$2.x;
      const tmpIfTest$10 = tmpChainElementObject$4 != null;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        p$7,
        tmpIfTest$15,
        tmpNestedComplexRhs$5,
        tmpChainRootProp$5,
        tmpIfTest$16,
        tmpChainElementObject$6,
        tmpIfTest$17,
      ) {
        const tmpChainElementObject$7 = tmpChainElementObject$6.y;
        tmpNestedComplexRhs$5 = tmpChainElementObject$7;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamDefault$7,
          p$7,
          tmpIfTest$15,
          tmpNestedComplexRhs$5,
          tmpChainRootProp$5,
          tmpIfTest$16,
          tmpChainElementObject$6,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        p$8,
        tmpIfTest$18,
        tmpNestedComplexRhs$6,
        tmpChainRootProp$6,
        tmpIfTest$19,
        tmpChainElementObject$8,
        tmpIfTest$20,
      ) {
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamDefault$8,
          p$8,
          tmpIfTest$18,
          tmpNestedComplexRhs$6,
          tmpChainRootProp$6,
          tmpIfTest$19,
          tmpChainElementObject$8,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        p$9,
        tmpIfTest$21,
        tmpNestedComplexRhs$7,
        tmpChainRootProp$7,
        tmpIfTest$22,
        tmpChainElementObject$9,
        tmpIfTest$23,
      ) {
        const tmpReturnArg$2 = tmpBranchingC$1(
          tmpParamDefault$9,
          p$9,
          tmpIfTest$21,
          tmpNestedComplexRhs$7,
          tmpChainRootProp$7,
          tmpIfTest$22,
        );
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$4,
          tmpIfTest$10,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$4,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$11, tmpNestedComplexRhs$3, tmpChainRootProp$3, tmpIfTest$12) {
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$11, tmpNestedComplexRhs$3, tmpChainRootProp$3, tmpIfTest$12);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$13, tmpNestedComplexRhs$4, tmpChainRootProp$4, tmpIfTest$14) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$3, tmpNestedComplexRhs$1, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$3, tmpNestedComplexRhs$1, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$6) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$6);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$7) {};
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$11;
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
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpIfTest$4 = b != null;
    const tmpBranchingA$1 = function (tmpNestedComplexRhs$2, tmpChainRootProp$2) {
      const tmpChainElementObject$4 = tmpChainRootProp$2.x;
      const tmpIfTest$10 = tmpChainElementObject$4 != null;
      if (tmpIfTest$10) {
        const tmpChainElementObject$7 = tmpChainElementObject$4.y;
        a = tmpChainElementObject$7;
        return undefined;
      } else {
        a = tmpNestedComplexRhs$2;
        return undefined;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(undefined, b);
      return tmpReturnArg$7;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA();
    return tmpReturnArg$10;
  } else {
    return undefined;
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
 - 1: undefined
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
