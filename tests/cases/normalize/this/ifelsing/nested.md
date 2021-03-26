# Preval test case

# nested.md

> Normalize > This > Ifelsing > Nested
>
> Test various ways in which `this` can occur

#TODO

## Input

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    if ($(1)) {
      if ($(2)) {
        return this.foo;
      }
    }
  }
};
$(a.f());
`````

## Pre Normal

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    const tmpthis = this;
    debugger;
    if ($(1)) {
      if ($(2)) {
        return tmpthis.foo;
      }
    }
  },
};
$(a.f());
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = 10;
const f = function () {
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
      const tmpReturnArg$3 = tmpthis$7.foo;
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpthis$9 = $$0;
      let tmpIfTest$15 = $$1;
      let tmpIfTest$17 = $$2;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpthis$9, tmpIfTest$15, tmpIfTest$17);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpthis$11 = $$0;
      let tmpIfTest$19 = $$1;
      let tmpIfTest$21 = $$2;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC(tmpthis$11, tmpIfTest$19);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpthis$1, tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(tmpthis$1, tmpIfTest$3, tmpIfTest$5);
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpthis$3 = $$0;
    let tmpIfTest$7 = $$1;
    debugger;
    const tmpReturnArg$13 = tmpBranchingC(tmpthis$3, tmpIfTest$7);
    return tmpReturnArg$13;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpthis$5 = $$0;
    let tmpIfTest$9 = $$1;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpthis, tmpIfTest);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB(tmpthis, tmpIfTest);
    return tmpReturnArg$17;
  }
};
const tmpObjLitVal$1 = f;
const a = { foo: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee = $;
const tmpCalleeParam = a.f();
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
      const tmpReturnArg$3 = tmpthis$1.foo;
      return tmpReturnArg$3;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpthis);
    return tmpReturnArg$15;
  } else {
    return undefined;
  }
};
const a = { foo: 10, f: f };
const tmpCalleeParam = a.f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
