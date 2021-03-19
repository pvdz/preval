# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)?.x)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $(b)?.x) : tmpParamDefault;
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$2) {
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$1 = tmpChainRootCall$1(b);
    const tmpIfTest$3 = tmpChainElementCall$1 != null;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      p$4,
      tmpIfTest$6,
      tmpNestedComplexRhs$2,
      tmpChainRootCall$2,
      tmpChainElementCall$2,
      tmpIfTest$7,
    ) {
      const tmpChainElementObject$2 = tmpChainElementCall$2.x;
      tmpNestedComplexRhs$2 = tmpChainElementObject$2;
      const tmpReturnArg = tmpBranchingC$1(
        tmpParamDefault$4,
        p$4,
        tmpIfTest$6,
        tmpNestedComplexRhs$2,
        tmpChainRootCall$2,
        tmpChainElementCall$2,
        tmpIfTest$7,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      p$5,
      tmpIfTest$8,
      tmpNestedComplexRhs$3,
      tmpChainRootCall$3,
      tmpChainElementCall$3,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpParamDefault$5,
        p$5,
        tmpIfTest$8,
        tmpNestedComplexRhs$3,
        tmpChainRootCall$3,
        tmpChainElementCall$3,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      p$6,
      tmpIfTest$10,
      tmpNestedComplexRhs$4,
      tmpChainRootCall$4,
      tmpChainElementCall$4,
      tmpIfTest$11,
    ) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        tmpParamDefault$1,
        p$1,
        tmpIfTest$2,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        tmpParamDefault$1,
        p$1,
        tmpIfTest$2,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$4) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let b = { x: 1 };
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
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$3 = tmpChainElementCall$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$2 = tmpChainElementCall$1.x;
      a = tmpChainElementObject$2;
      return undefined;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA();
    return tmpReturnArg$6;
  } else {
    return undefined;
  }
};
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
