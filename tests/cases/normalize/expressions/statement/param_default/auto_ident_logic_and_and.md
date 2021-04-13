# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(1)) && $($(1)) && $($(2))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($(1)) && $($(1)) && $($(2)) : tmpParamBare;
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
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    p = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$11 = $;
      const tmpCalleeParam$11 = $(1);
      p = tmpCallCallee$11(tmpCalleeParam$11);
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpCallCallee$15 = $;
        const tmpCalleeParam$15 = $(2);
        p = tmpCallCallee$15(tmpCalleeParam$15);
        const tmpReturnArg = tmpBranchingC$3();
        return tmpReturnArg;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$3();
        return tmpReturnArg$1;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1();
        return tmpReturnArg$3;
      };
      if (p) {
        const tmpReturnArg$5 = tmpBranchingA$3();
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$3();
        return tmpReturnArg$7;
      }
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1();
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$11 = tmpBranchingC();
      return tmpReturnArg$11;
    };
    if (p) {
      const tmpReturnArg$13 = tmpBranchingA$1();
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1();
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    p = tmpParamBare;
    const tmpReturnArg$17 = tmpBranchingC();
    return tmpReturnArg$17;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$17 = $;
const tmpCalleeParam$17 = f();
tmpCallCallee$17(tmpCalleeParam$17);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpBranchingA$1 = function () {
    debugger;
    const tmpCalleeParam$11 = $(1);
    p = $(tmpCalleeParam$11);
    if (p) {
      const tmpCalleeParam$15 = $(2);
      p = $(tmpCalleeParam$15);
      return undefined;
    } else {
      return undefined;
    }
  };
  let p = undefined;
  const tmpCalleeParam$5 = $(1);
  p = $(tmpCalleeParam$5);
  if (p) {
    const tmpReturnArg = tmpBranchingA$1();
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$17 = f();
$(tmpCalleeParam$17);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
