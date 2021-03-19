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
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpIfTest$3) {
    const tmpIfTest$4 = $(2);
    const tmpBranchingA$1 = function (tmpIfTest$8, tmpIfTest$9) {
      const tmpReturnArg$8 = $(3);
      return tmpReturnArg$8;
    };
    const tmpBranchingB$1 = function (tmpIfTest$10, tmpIfTest$11) {
      const tmpReturnArg$9 = $(4);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function (tmpIfTest$12, tmpIfTest$13) {
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
  const tmpBranchingB = function (tmpIfTest$5) {
    const tmpIfTest$6 = $(5);
    const tmpBranchingA$2 = function (tmpIfTest$14, tmpIfTest$15) {
      const tmpReturnArg$13 = $(6);
      return tmpReturnArg$13;
    };
    const tmpBranchingB$2 = function (tmpIfTest$16, tmpIfTest$17) {
      const tmpReturnArg$14 = $(7);
      return tmpReturnArg$14;
    };
    const tmpBranchingC$2 = function (tmpIfTest$18, tmpIfTest$19) {
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
  const tmpBranchingC = function (tmpIfTest$7) {};
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
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
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
