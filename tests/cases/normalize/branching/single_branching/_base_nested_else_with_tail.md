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
  const tmpIfTest = $(0);
  const tmpBranchingA = function (tmpIfTest$2) {
    $(2);
    const tmpReturnArg$2 = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpIfTest$3) {
    const tmpIfTest$4 = $(3);
    const tmpBranchingA$1 = function (tmpIfTest$6, tmpIfTest$7) {
      $(4);
      const tmpReturnArg$4 = tmpBranchingC$1(tmpIfTest$6, tmpIfTest$7);
      return tmpReturnArg$4;
    };
    const tmpBranchingB$1 = function (tmpIfTest$8, tmpIfTest$9) {
      $(5);
      const tmpReturnArg$5 = tmpBranchingC$1(tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function (tmpIfTest$10, tmpIfTest$11) {
      const tmpReturnArg$3 = $(6);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$6 = tmpBranchingA$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$6;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingC = function (tmpIfTest$5) {
    const tmpReturnArg$8 = $(7);
    return tmpReturnArg$8;
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$10 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$10;
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
  const tmpIfTest = $(0);
  const tmpBranchingB = function () {
    const tmpIfTest$4 = $(3);
    if (tmpIfTest$4) {
      $(4);
      const tmpReturnArg$4 = $(6);
      return tmpReturnArg$4;
    } else {
      $(5);
      const tmpReturnArg$5 = $(6);
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$2 = $(7);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$10 = tmpBranchingB();
    return tmpReturnArg$10;
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
