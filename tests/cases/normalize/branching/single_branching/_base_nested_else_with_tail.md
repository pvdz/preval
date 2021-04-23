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
  const tmpBranchingA = function () {
    debugger;
    $(2);
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$3 = $(3);
    const tmpBranchingA$1 = function () {
      debugger;
      $(4);
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      $(5);
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      tmpReturnArg$1 = $(6);
      return tmpReturnArg$1;
    };
    let tmpReturnArg$1 = undefined;
    if (tmpIfTest$3) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$13 = $(7);
    return tmpReturnArg$13;
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA();
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB();
    return tmpReturnArg$17;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'final';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpBranchingB = function () {
  debugger;
  const tmpIfTest$3 = $(3);
  if (tmpIfTest$3) {
    $(4);
    const tmpReturnArg$5 = $(6);
    return tmpReturnArg$5;
  } else {
    $(5);
    const tmpReturnArg$7 = $(6);
    return tmpReturnArg$7;
  }
};
const f = function () {
  debugger;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$3 = $(7);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$17 = tmpBranchingB();
    return tmpReturnArg$17;
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
