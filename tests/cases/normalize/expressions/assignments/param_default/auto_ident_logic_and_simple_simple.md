# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = 1 && 2)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = 1 && 2) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let p$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    let tmpNestedComplexRhs$1 = 1;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$4 = $$2;
      let tmpNestedComplexRhs$2 = $$3;
      debugger;
      tmpNestedComplexRhs$2 = 2;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$4, p$4, tmpIfTest$4, tmpNestedComplexRhs$2);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$5 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$5, tmpNestedComplexRhs$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpNestedComplexRhs$4 = $$3;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpNestedComplexRhs$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpNestedComplexRhs$1);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(undefined);
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
