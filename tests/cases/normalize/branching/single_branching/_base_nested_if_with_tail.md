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
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$2 = $$0;
    debugger;
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$6 = $$0;
      let tmpIfTest$7 = $$1;
      debugger;
      $(3);
      const tmpReturnArg$3 = tmpBranchingC$1(tmpIfTest$6, tmpIfTest$7);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$8 = $$0;
      let tmpIfTest$9 = $$1;
      debugger;
      $(4);
      const tmpReturnArg$4 = tmpBranchingC$1(tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$4;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$10 = $$0;
      let tmpIfTest$11 = $$1;
      debugger;
      const tmpReturnArg$2 = $(5);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$4 = $$0;
    debugger;
    $(6);
    const tmpReturnArg$7 = tmpBranchingC(tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
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
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      $(3);
      const tmpReturnArg$3 = $(5);
      return tmpReturnArg$3;
    } else {
      $(4);
      const tmpReturnArg$4 = $(5);
      return tmpReturnArg$4;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA();
    return tmpReturnArg$9;
  } else {
    $(6);
    const tmpReturnArg$7 = $(7);
    return tmpReturnArg$7;
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
