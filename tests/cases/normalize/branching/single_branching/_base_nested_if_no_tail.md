# Preval test case

# _base_nested_if_no_tail.md

> Normalize > Branching > Single branching > Base nested if no tail
>
> Functions should have at most one if-else and abstract others


#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    // This if-else should be abstracted into its own function
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    return $(5);
  }
}
$(f(), 'final');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    return $(5);
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
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpIfTest$5 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$11 = $$0;
      let tmpIfTest$13 = $$1;
      debugger;
      const tmpReturnArg$11 = $(3);
      return tmpReturnArg$11;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$15 = $$0;
      let tmpIfTest$17 = $$1;
      debugger;
      const tmpReturnArg$13 = $(4);
      return tmpReturnArg$13;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$19 = $$0;
      let tmpIfTest$21 = $$1;
      debugger;
      const tmpReturnArg$15 = tmpBranchingC(tmpIfTest$19);
      return tmpReturnArg$15;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$17 = tmpBranchingA$1(tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$1(tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$19;
    }
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$7 = $$0;
    debugger;
    const tmpReturnArg$9 = $(5);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$9 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$21 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$23;
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
  const tmpIfTest$5 = $(2);
  if (tmpIfTest$5) {
    const tmpReturnArg$17 = $(3);
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$19 = $(4);
    return tmpReturnArg$19;
  }
};
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg$21 = tmpBranchingA();
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = $(5);
    return tmpReturnArg$23;
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
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
