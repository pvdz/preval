# Preval test case

# this.md

> Ifelse > This
>
> Return this

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return this;
    }
  }
}
const obj = {f, foo: 10};
$(obj.f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  if ($(1)) {
    if ($(2)) {
      return tmpthis;
    }
  }
};
const obj = { f: f, foo: 10 };
$(obj.f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function () {
      debugger;
      return tmpthis;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1();
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$7 = tmpBranchingC();
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA();
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$11 = tmpBranchingB();
    return tmpReturnArg$11;
  }
};
const obj = { f: f, foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      return tmpthis;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA();
    return tmpReturnArg$9;
  } else {
    return undefined;
  }
};
const obj = { f: f, foo: 10 };
const tmpCalleeParam = obj.f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { f: '"<function>"', foo: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
