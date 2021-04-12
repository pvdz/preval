# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1)) && $($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(1)) && $($(1)) && $($(2)));
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
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(2);
      a = tmpCallCallee$7(tmpCalleeParam$7);
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      tmpReturnArg = a;
      return tmpReturnArg;
    };
    if (a) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
  };
  let tmpReturnArg = undefined;
  if (a) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
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
const f = function () {
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    tmpReturnArg = a;
    return tmpReturnArg;
  };
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    debugger;
    if (a) {
      const tmpCalleeParam$7 = $(2);
      a = $(tmpCalleeParam$7);
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$11 = tmpBranchingC$1();
      return tmpReturnArg$11;
    }
  };
  let tmpReturnArg = undefined;
  if (a) {
    const tmpCalleeParam$3 = $(1);
    a = $(tmpCalleeParam$3);
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$15 = tmpBranchingC();
    return tmpReturnArg$15;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$9 = f();
$(tmpCalleeParam$9);
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
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
