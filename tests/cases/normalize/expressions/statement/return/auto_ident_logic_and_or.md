# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Return > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return ($($(1)) && $($(1))) || $($(2));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return ($($(1)) && $($(1))) || $($(2));
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
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpReturnArg = tmpCallCallee$3(tmpCalleeParam$3);
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
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(2);
      tmpReturnArg = tmpCallCallee$7(tmpCalleeParam$7);
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      return tmpReturnArg;
    };
    if (tmpReturnArg) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
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
const tmpCallCallee$9 = $;
const tmpCalleeParam$9 = f();
tmpCallCallee$9(tmpCalleeParam$9);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  let tmpReturnArg = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    debugger;
    if (tmpReturnArg) {
      const tmpReturnArg$5 = tmpReturnArg;
      return tmpReturnArg$5;
    } else {
      const tmpCalleeParam$7 = $(2);
      tmpReturnArg = $(tmpCalleeParam$7);
      const tmpReturnArg$7 = tmpReturnArg;
      return tmpReturnArg$7;
    }
  };
  if (tmpReturnArg) {
    const tmpCalleeParam$3 = $(1);
    tmpReturnArg = $(tmpCalleeParam$3);
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$15 = tmpBranchingC();
    return tmpReturnArg$15;
  }
};
const a = { a: 999, b: 1000 };
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
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
