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
const obj = { f, foo: 10 };
$(obj.f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0, $$1) {
    let tmpthis$1 = $$0;
    let tmpIfTest$2 = $$1;
    debugger;
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpthis$4 = $$0;
      let tmpIfTest$6 = $$1;
      let tmpIfTest$7 = $$2;
      debugger;
      return tmpthis$4;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpthis$5 = $$0;
      let tmpIfTest$8 = $$1;
      let tmpIfTest$9 = $$2;
      debugger;
      const tmpReturnArg = tmpBranchingC$1(tmpthis$5, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpthis$6 = $$0;
      let tmpIfTest$10 = $$1;
      let tmpIfTest$11 = $$2;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC(tmpthis$6, tmpIfTest$10);
      return tmpReturnArg$1;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpBranchingA$1(tmpthis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingB$1(tmpthis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$3;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpthis$2 = $$0;
    let tmpIfTest$4 = $$1;
    debugger;
    const tmpReturnArg$4 = tmpBranchingC(tmpthis$2, tmpIfTest$4);
    return tmpReturnArg$4;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpthis$3 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpthis, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$6 = tmpBranchingB(tmpthis, tmpIfTest);
    return tmpReturnArg$6;
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
  const tmpBranchingA = function ($$0) {
    const tmpthis$1 = $$0;
    debugger;
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      return tmpthis$1;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpthis);
    return tmpReturnArg$5;
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
