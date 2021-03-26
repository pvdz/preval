# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = 0 || $($(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? 0 || $($(1)) : tmpParamBare;
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
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$7 = $$2;
      debugger;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$7, p$7, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$9 = $$2;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(1);
      p$9 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$11 = $$2;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$11);
      return tmpReturnArg$3;
    };
    if (p$1) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$13;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = $(1);
$(tmpCalleeParam$3);
$(undefined);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
