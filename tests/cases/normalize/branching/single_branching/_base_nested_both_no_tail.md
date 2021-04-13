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
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$5 = $(2);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpReturnArg$15 = $(3);
      return tmpReturnArg$15;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$17 = $(4);
      return tmpReturnArg$17;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$19 = tmpBranchingC();
      return tmpReturnArg$19;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$21 = tmpBranchingA$1();
      return tmpReturnArg$21;
    } else {
      const tmpReturnArg$23 = tmpBranchingB$1();
      return tmpReturnArg$23;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$7 = $(5);
    const tmpBranchingA$3 = function () {
      debugger;
      const tmpReturnArg$25 = $(6);
      return tmpReturnArg$25;
    };
    const tmpBranchingB$3 = function () {
      debugger;
      const tmpReturnArg$27 = $(7);
      return tmpReturnArg$27;
    };
    const tmpBranchingC$3 = function () {
      debugger;
      const tmpReturnArg$29 = tmpBranchingC();
      return tmpReturnArg$29;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$31 = tmpBranchingA$3();
      return tmpReturnArg$31;
    } else {
      const tmpReturnArg$33 = tmpBranchingB$3();
      return tmpReturnArg$33;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$35 = tmpBranchingA();
    return tmpReturnArg$35;
  } else {
    const tmpReturnArg$37 = tmpBranchingB();
    return tmpReturnArg$37;
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
  const tmpIfTest$7 = $(5);
  if (tmpIfTest$7) {
    const tmpReturnArg$31 = $(6);
    return tmpReturnArg$31;
  } else {
    const tmpReturnArg$33 = $(7);
    return tmpReturnArg$33;
  }
};
const tmpBranchingA = function () {
  debugger;
  const tmpIfTest$5 = $(2);
  if (tmpIfTest$5) {
    const tmpReturnArg$21 = $(3);
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = $(4);
    return tmpReturnArg$23;
  }
};
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg$35 = tmpBranchingA();
    return tmpReturnArg$35;
  } else {
    const tmpReturnArg$37 = tmpBranchingB();
    return tmpReturnArg$37;
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
