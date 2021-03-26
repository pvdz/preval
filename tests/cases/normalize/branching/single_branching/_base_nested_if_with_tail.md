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
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpIfTest$5 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$11 = $$0;
      let tmpIfTest$13 = $$1;
      debugger;
      $(3);
      const tmpReturnArg$5 = tmpBranchingC$1(tmpIfTest$11, tmpIfTest$13);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$15 = $$0;
      let tmpIfTest$17 = $$1;
      debugger;
      $(4);
      const tmpReturnArg$7 = tmpBranchingC$1(tmpIfTest$15, tmpIfTest$17);
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$19 = $$0;
      let tmpIfTest$21 = $$1;
      debugger;
      const tmpReturnArg$3 = $(5);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$7 = $$0;
    debugger;
    $(6);
    const tmpReturnArg$13 = tmpBranchingC(tmpIfTest$7);
    return tmpReturnArg$13;
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
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$5 = $(2);
    if (tmpIfTest$5) {
      $(3);
      const tmpReturnArg$5 = $(5);
      return tmpReturnArg$5;
    } else {
      $(4);
      const tmpReturnArg$7 = $(5);
      return tmpReturnArg$7;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$17 = tmpBranchingA();
    return tmpReturnArg$17;
  } else {
    $(6);
    const tmpReturnArg$13 = $(7);
    return tmpReturnArg$13;
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
