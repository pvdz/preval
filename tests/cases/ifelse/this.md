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
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpIfTest$5 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpthis$7 = $$0;
      let tmpIfTest$11 = $$1;
      let tmpIfTest$13 = $$2;
      debugger;
      return tmpthis$7;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpthis$9 = $$0;
      let tmpIfTest$15 = $$1;
      let tmpIfTest$17 = $$2;
      debugger;
      const tmpReturnArg = tmpBranchingC$1(tmpthis$9, tmpIfTest$15, tmpIfTest$17);
      return tmpReturnArg;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpthis$11 = $$0;
      let tmpIfTest$19 = $$1;
      let tmpIfTest$21 = $$2;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC(tmpthis$11, tmpIfTest$19);
      return tmpReturnArg$1;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpthis$1, tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpthis$1, tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpthis$3 = $$0;
    let tmpIfTest$7 = $$1;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpthis$3, tmpIfTest$7);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpthis$5 = $$0;
    let tmpIfTest$9 = $$1;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA(tmpthis, tmpIfTest);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpthis, tmpIfTest);
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
  const tmpBranchingA = function ($$0) {
    const tmpthis$1 = $$0;
    debugger;
    const tmpIfTest$5 = $(2);
    if (tmpIfTest$5) {
      return tmpthis$1;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA(tmpthis);
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
