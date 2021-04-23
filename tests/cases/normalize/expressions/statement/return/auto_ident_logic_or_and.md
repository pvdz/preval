# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Return > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(0)) || ($($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $($(0)) || ($($(1)) && $($(2)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    tmpReturnArg = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      tmpReturnArg = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$7 = tmpBranchingC();
      return tmpReturnArg$7;
    };
    if (tmpReturnArg) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    return tmpReturnArg;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingB = function () {
  debugger;
  const tmpCalleeParam$5 = $(1);
  const tmpSSA_tmpssa2_tmpReturnArg = $(tmpCalleeParam$5);
  if (tmpSSA_tmpssa2_tmpReturnArg) {
    const tmpCalleeParam$9 = $(2);
    const tmpSSA_tmpssa2_tmpReturnArg$1 = $(tmpCalleeParam$9);
    return tmpSSA_tmpssa2_tmpReturnArg$1;
  } else {
    return tmpSSA_tmpssa2_tmpReturnArg;
  }
};
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
