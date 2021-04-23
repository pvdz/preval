# Preval test case

# _base_nested_if_with_tail.md

> Normalize > Branching > Single branching > Base nested if with tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    $(6);
  }
  return $(7);
}
$(f(), 'final');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    if ($(2)) {
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    $(6);
  }
  return $(7);
};
$(f(), 'final');
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function () {
      debugger;
      $(3);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      $(4);
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      tmpReturnArg$1 = $(5);
      return tmpReturnArg$1;
    };
    let tmpReturnArg$1 = undefined;
    if (tmpIfTest$3) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    $(6);
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
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
const tmpBranchingA = function () {
  debugger;
  const tmpIfTest$3 = $(2);
  if (tmpIfTest$3) {
    $(3);
    const tmpReturnArg$3 = $(5);
    return tmpReturnArg$3;
  } else {
    $(4);
    const tmpReturnArg$5 = $(5);
    return tmpReturnArg$5;
  }
};
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA();
    return tmpReturnArg$15;
  } else {
    $(6);
    const tmpReturnArg$11 = $(7);
    return tmpReturnArg$11;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'final');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 5
 - 5: 5, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
