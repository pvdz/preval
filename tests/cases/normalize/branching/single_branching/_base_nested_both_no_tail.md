# Preval test case

# _base_nested_both_no_tail.md

> Normalize > Branching > Single branching > Base nested both no tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    if ($(5)) {
      return $(6);
    } else {
      return $(7);
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
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    if ($(5)) {
      return $(6);
    } else {
      return $(7);
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
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpIfTest$4 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$8 = $$0;
      let tmpIfTest$9 = $$1;
      debugger;
      const tmpReturnArg$8 = $(3);
      return tmpReturnArg$8;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$10 = $$0;
      let tmpIfTest$11 = $$1;
      debugger;
      const tmpReturnArg$9 = $(4);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$12 = $$0;
      let tmpIfTest$13 = $$1;
      debugger;
      const tmpReturnArg$10 = tmpBranchingC(tmpIfTest$12);
      return tmpReturnArg$10;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$11 = tmpBranchingA$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$12 = tmpBranchingB$1(tmpIfTest$3, tmpIfTest$4);
      return tmpReturnArg$12;
    }
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    const tmpIfTest$6 = $(5);
    const tmpBranchingA$2 = function ($$0, $$1) {
      let tmpIfTest$14 = $$0;
      let tmpIfTest$15 = $$1;
      debugger;
      const tmpReturnArg$13 = $(6);
      return tmpReturnArg$13;
    };
    const tmpBranchingB$2 = function ($$0, $$1) {
      let tmpIfTest$16 = $$0;
      let tmpIfTest$17 = $$1;
      debugger;
      const tmpReturnArg$14 = $(7);
      return tmpReturnArg$14;
    };
    const tmpBranchingC$2 = function ($$0, $$1) {
      let tmpIfTest$18 = $$0;
      let tmpIfTest$19 = $$1;
      debugger;
      const tmpReturnArg$15 = tmpBranchingC(tmpIfTest$18);
      return tmpReturnArg$15;
    };
    if (tmpIfTest$6) {
      const tmpReturnArg$16 = tmpBranchingA$2(tmpIfTest$5, tmpIfTest$6);
      return tmpReturnArg$16;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$2(tmpIfTest$5, tmpIfTest$6);
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$7 = $$0;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$18 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$18;
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
    const tmpIfTest$4 = $(2);
    if (tmpIfTest$4) {
      const tmpReturnArg$11 = $(3);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$12 = $(4);
      return tmpReturnArg$12;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$6 = $(5);
    if (tmpIfTest$6) {
      const tmpReturnArg$16 = $(6);
      return tmpReturnArg$16;
    } else {
      const tmpReturnArg$17 = $(7);
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$18 = tmpBranchingA();
    return tmpReturnArg$18;
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
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
