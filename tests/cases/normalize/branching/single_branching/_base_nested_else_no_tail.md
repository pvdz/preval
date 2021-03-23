# Preval test case

# _base_nested_else_no_tail.md

> Normalize > Branching > Single branching > Base nested else no tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return $(2);
  } else {
    if ($(3)) {
      return $(4);
    } else {
      return $(5);
    }
  }
}
$(f(), 'final');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    return $(2);
  } else {
    if ($(3)) {
      return $(4);
    } else {
      return $(5);
    }
  }
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
    const tmpReturnArg$3 = $(2);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpIfTest$4 = $(3);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$6 = $$0;
      let tmpIfTest$7 = $$1;
      debugger;
      const tmpReturnArg$6 = $(4);
      return tmpReturnArg$6;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$8 = $$0;
      let tmpIfTest$9 = $$1;
      debugger;
      const tmpReturnArg$7 = $(5);
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$10 = $$0;
      let tmpIfTest$11 = $$1;
      debugger;
      const tmpReturnArg$8 = tmpBranchingC(tmpIfTest$10);
      return tmpReturnArg$8;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$10 = tmpBranchingB$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$10;
    }
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$12 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$12;
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
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$4 = $(3);
    if (tmpIfTest$4) {
      const tmpReturnArg$9 = $(4);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$10 = $(5);
      return tmpReturnArg$10;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = $(2);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$12 = tmpBranchingB();
    return tmpReturnArg$12;
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
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
