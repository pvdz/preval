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
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpIfTest$4 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$8 = $$0;
      let tmpIfTest$9 = $$1;
      debugger;
      $(3);
      const tmpReturnArg$5 = tmpBranchingC$1(tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$10 = $$0;
      let tmpIfTest$11 = $$1;
      debugger;
      $(4);
      const tmpReturnArg$6 = tmpBranchingC$1(tmpIfTest$10, tmpIfTest$11);
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$12 = $$0;
      let tmpIfTest$13 = $$1;
      debugger;
      const tmpReturnArg$4 = $(5);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    const tmpIfTest$6 = $(6);
    const tmpBranchingA$2 = function ($$0, $$1) {
      let tmpIfTest$14 = $$0;
      let tmpIfTest$15 = $$1;
      debugger;
      $(7);
      const tmpReturnArg$10 = tmpBranchingC$2(tmpIfTest$14, tmpIfTest$15);
      return tmpReturnArg$10;
    };
    const tmpBranchingB$2 = function ($$0, $$1) {
      let tmpIfTest$16 = $$0;
      let tmpIfTest$17 = $$1;
      debugger;
      $(8);
      const tmpReturnArg$11 = tmpBranchingC$2(tmpIfTest$16, tmpIfTest$17);
      return tmpReturnArg$11;
    };
    const tmpBranchingC$2 = function ($$0, $$1) {
      let tmpIfTest$18 = $$0;
      let tmpIfTest$19 = $$1;
      debugger;
      const tmpReturnArg$9 = $(9);
      return tmpReturnArg$9;
    };
    if (tmpIfTest$6) {
      const tmpReturnArg$12 = tmpBranchingA$2(tmpIfTest$5, tmpIfTest$6);
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$2(tmpIfTest$5, tmpIfTest$6);
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$7 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$14 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$15;
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
    const tmpIfTest$4 = $(2);
    if (tmpIfTest$4) {
      $(3);
      const tmpReturnArg$5 = $(5);
      return tmpReturnArg$5;
    } else {
      $(4);
      const tmpReturnArg$6 = $(5);
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$6 = $(6);
    if (tmpIfTest$6) {
      $(7);
      const tmpReturnArg$10 = $(9);
      return tmpReturnArg$10;
    } else {
      $(8);
      const tmpReturnArg$11 = $(9);
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$14 = tmpBranchingA();
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
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
