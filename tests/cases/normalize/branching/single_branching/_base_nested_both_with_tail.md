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
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$5 = $(2);
    const tmpBranchingA$1 = function () {
      debugger;
      $(3);
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      $(4);
      const tmpReturnArg$9 = tmpBranchingC$1();
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      tmpReturnArg$3 = $(5);
      return tmpReturnArg$3;
    };
    let tmpReturnArg$3 = undefined;
    if (tmpIfTest$5) {
      const tmpReturnArg$11 = tmpBranchingA$1();
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1();
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$7 = $(6);
    const tmpBranchingA$3 = function () {
      debugger;
      $(7);
      const tmpReturnArg$15 = tmpBranchingC$3();
      return tmpReturnArg$15;
    };
    const tmpBranchingB$3 = function () {
      debugger;
      $(8);
      const tmpReturnArg$17 = tmpBranchingC$3();
      return tmpReturnArg$17;
    };
    const tmpBranchingC$3 = function () {
      debugger;
      tmpReturnArg$5 = $(9);
      return tmpReturnArg$5;
    };
    let tmpReturnArg$5 = undefined;
    if (tmpIfTest$7) {
      const tmpReturnArg$19 = tmpBranchingA$3();
      return tmpReturnArg$19;
    } else {
      const tmpReturnArg$21 = tmpBranchingB$3();
      return tmpReturnArg$21;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$23 = tmpBranchingA();
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = tmpBranchingB();
    return tmpReturnArg$25;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'final';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpBranchingB = function () {
  debugger;
  const tmpIfTest$7 = $(6);
  const tmpBranchingC$3 = function () {
    debugger;
    tmpReturnArg$5 = $(9);
    return tmpReturnArg$5;
  };
  let tmpReturnArg$5 = undefined;
  if (tmpIfTest$7) {
    $(7);
    const tmpReturnArg$15 = tmpBranchingC$3();
    return tmpReturnArg$15;
  } else {
    $(8);
    const tmpReturnArg$17 = tmpBranchingC$3();
    return tmpReturnArg$17;
  }
};
const tmpBranchingA = function () {
  debugger;
  const tmpIfTest$5 = $(2);
  const tmpBranchingC$1 = function () {
    debugger;
    tmpReturnArg$3 = $(5);
    return tmpReturnArg$3;
  };
  let tmpReturnArg$3 = undefined;
  if (tmpIfTest$5) {
    $(3);
    const tmpReturnArg$7 = tmpBranchingC$1();
    return tmpReturnArg$7;
  } else {
    $(4);
    const tmpReturnArg$9 = tmpBranchingC$1();
    return tmpReturnArg$9;
  }
};
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg$23 = tmpBranchingA();
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = tmpBranchingB();
    return tmpReturnArg$25;
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
