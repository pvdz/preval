# Preval test case

# inline_remainder-if2.md

> Normalize > Return > Inline remainder-if2
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
    return $(3);
  }
  $(4);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    $(2);
    return $(3);
  }
  $(4);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    $(2);
    const tmpReturnArg$1 = $(3);
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    $(4);
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$1 = $(3);
    return tmpReturnArg$1;
  } else {
    $(4);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
