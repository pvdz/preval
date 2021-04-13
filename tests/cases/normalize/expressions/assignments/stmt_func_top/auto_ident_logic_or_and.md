# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($(0)) || ($($(1)) && $($(2)));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = $($(0)) || ($($(1)) && $($(2)));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function () {
    debugger;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    a = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      a = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    if (a) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    $(a);
    return undefined;
  };
  if (a) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpSSA_a = $(tmpCalleeParam);
const tmpBranchingB = function () {
  debugger;
  const tmpCalleeParam$5 = $(1);
  tmpSSA_a = $(tmpCalleeParam$5);
  if (tmpSSA_a) {
    const tmpCalleeParam$9 = $(2);
    tmpSSA_a = $(tmpCalleeParam$9);
    tmpBranchingC();
    return undefined;
  } else {
    tmpBranchingC();
    return undefined;
  }
};
const tmpBranchingC = function () {
  debugger;
  $(tmpSSA_a);
  return undefined;
};
if (tmpSSA_a) {
  tmpBranchingC();
} else {
  tmpBranchingB();
}
$(undefined);
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
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
