# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = 0 || 2) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? 0 || 2 : tmpParamBare;
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
    p$1 = 0;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$4 = $$2;
      debugger;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$4, p$4, tmpIfTest$4);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$5 = $$2;
      debugger;
      p$5 = 2;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$5);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$6 = $$2;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    if (p$1) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1);
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
const a = { a: 999, b: 1000 };
$(undefined);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
