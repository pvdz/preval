# Preval test case

# _base_nested_both_with_tail.md

> Normalize > Branching > Single branching > Base nested both with tail
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
    if ($(6)) {
      $(7);
    } else {
      $(8);
    }
    return $(9);
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
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    if ($(6)) {
      $(7);
    } else {
      $(8);
    }
    return $(9);
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
    let tmpIfTest$5 = $$0;
    debugger;
    const tmpIfTest$7 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$15 = $$0;
      let tmpIfTest$17 = $$1;
      debugger;
      $(3);
      const tmpReturnArg$9 = tmpBranchingC$1(tmpIfTest$15, tmpIfTest$17);
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$19 = $$0;
      let tmpIfTest$21 = $$1;
      debugger;
      $(4);
      const tmpReturnArg$11 = tmpBranchingC$1(tmpIfTest$19, tmpIfTest$21);
      return tmpReturnArg$11;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$23 = $$0;
      let tmpIfTest$25 = $$1;
      debugger;
      const tmpReturnArg$7 = $(5);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$13 = tmpBranchingA$1(tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(tmpIfTest$5, tmpIfTest$7);
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$9 = $$0;
    debugger;
    const tmpIfTest$11 = $(6);
    const tmpBranchingA$3 = function ($$0, $$1) {
      let tmpIfTest$27 = $$0;
      let tmpIfTest$29 = $$1;
      debugger;
      $(7);
      const tmpReturnArg$19 = tmpBranchingC$3(tmpIfTest$27, tmpIfTest$29);
      return tmpReturnArg$19;
    };
    const tmpBranchingB$3 = function ($$0, $$1) {
      let tmpIfTest$31 = $$0;
      let tmpIfTest$33 = $$1;
      debugger;
      $(8);
      const tmpReturnArg$21 = tmpBranchingC$3(tmpIfTest$31, tmpIfTest$33);
      return tmpReturnArg$21;
    };
    const tmpBranchingC$3 = function ($$0, $$1) {
      let tmpIfTest$35 = $$0;
      let tmpIfTest$37 = $$1;
      debugger;
      const tmpReturnArg$17 = $(9);
      return tmpReturnArg$17;
    };
    if (tmpIfTest$11) {
      const tmpReturnArg$23 = tmpBranchingA$3(tmpIfTest$9, tmpIfTest$11);
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$3(tmpIfTest$9, tmpIfTest$11);
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$13 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$29;
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
    const tmpIfTest$7 = $(2);
    if (tmpIfTest$7) {
      $(3);
      const tmpReturnArg$9 = $(5);
      return tmpReturnArg$9;
    } else {
      $(4);
      const tmpReturnArg$11 = $(5);
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$11 = $(6);
    if (tmpIfTest$11) {
      $(7);
      const tmpReturnArg$19 = $(9);
      return tmpReturnArg$19;
    } else {
      $(8);
      const tmpReturnArg$21 = $(9);
      return tmpReturnArg$21;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA();
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB();
    return tmpReturnArg$29;
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
