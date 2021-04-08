# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($(0)) || $($(1)) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = $($(0)) || $($(1)) || $($(2));
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
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(2);
      a = tmpCallCallee$7(tmpCalleeParam$7);
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      $(a);
    };
    if (a) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  if (a) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$9 = $;
const tmpCalleeParam$9 = f();
tmpCallCallee$9(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  let tmpSSA_a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    debugger;
    if (tmpSSA_a) {
      $(tmpSSA_a);
      return undefined;
    } else {
      const tmpCalleeParam$7 = $(2);
      tmpSSA_a = $(tmpCalleeParam$7);
      $(tmpSSA_a);
      return undefined;
    }
  };
  if (tmpSSA_a) {
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
  } else {
    const tmpCalleeParam$3 = $(1);
    tmpSSA_a = $(tmpCalleeParam$3);
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$9 = f();
$(tmpCalleeParam$9);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
