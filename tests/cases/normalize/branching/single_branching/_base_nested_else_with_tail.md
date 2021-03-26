# Preval test case

# _base_nested_else_with_tail.md

> Normalize > Branching > Single branching > Base nested else with tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(0)) {
    $(2);
  } else {
    if ($(3)) {
      $(4);
    } else {
      $(5);
    }
    return $(6);
  }
  return $(7);
}
$(f(), 'final');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(0)) {
    $(2);
  } else {
    if ($(3)) {
      $(4);
    } else {
      $(5);
    }
    return $(6);
  }
  return $(7);
};
$(f(), 'final');
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(0);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    $(2);
    const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    const tmpIfTest$7 = $(3);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$11 = $$0;
      let tmpIfTest$13 = $$1;
      debugger;
      $(4);
      const tmpReturnArg$7 = tmpBranchingC$1(tmpIfTest$11, tmpIfTest$13);
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$15 = $$0;
      let tmpIfTest$17 = $$1;
      debugger;
      $(5);
      const tmpReturnArg$9 = tmpBranchingC$1(tmpIfTest$15, tmpIfTest$17);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$19 = $$0;
      let tmpIfTest$21 = $$1;
      debugger;
      const tmpReturnArg$5 = $(6);
      return tmpReturnArg$5;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$11 = tmpBranchingA$1(tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$9 = $$0;
    debugger;
    const tmpReturnArg$15 = $(7);
    return tmpReturnArg$15;
  };
  if (tmpIfTest) {
    const tmpReturnArg$17 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$19 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$19;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'final';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(0);
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$7 = $(3);
    if (tmpIfTest$7) {
      $(4);
      const tmpReturnArg$7 = $(6);
      return tmpReturnArg$7;
    } else {
      $(5);
      const tmpReturnArg$9 = $(6);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$3 = $(7);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$19 = tmpBranchingB();
    return tmpReturnArg$19;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'final');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 3
 - 3: 4
 - 4: 6
 - 5: 6, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
