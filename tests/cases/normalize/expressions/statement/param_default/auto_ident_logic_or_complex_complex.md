# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || $($(2))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($(0)) || $($(2)) : tmpParamBare;
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
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(0);
    p = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(2);
      p = tmpCallCallee$7(tmpCalleeParam$7);
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (p) {
      const tmpReturnArg$5 = tmpBranchingA$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    p = tmpParamBare;
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$9 = $;
const tmpCalleeParam$9 = f();
tmpCallCallee$9(tmpCalleeParam$9);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = $(0);
const tmpSSA_p = $(tmpCalleeParam$3);
if (tmpSSA_p) {
} else {
  const tmpCalleeParam$7 = $(2);
  $(tmpCalleeParam$7);
}
$(undefined);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
