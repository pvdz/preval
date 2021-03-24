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
    let tmpIfTest$2 = $$1;
    debugger;
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpthis$4 = $$0;
      let tmpIfTest$6 = $$1;
      let tmpIfTest$7 = $$2;
      debugger;
      const tmpReturnArg$2 = tmpthis$4.foo;
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpthis$5 = $$0;
      let tmpIfTest$8 = $$1;
      let tmpIfTest$9 = $$2;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpthis$5, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpthis$6 = $$0;
      let tmpIfTest$10 = $$1;
      let tmpIfTest$11 = $$2;
      debugger;
      const tmpReturnArg$4 = tmpBranchingC(tmpthis$6, tmpIfTest$10);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpthis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(tmpthis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpthis$2 = $$0;
    let tmpIfTest$4 = $$1;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpthis$2, tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpthis$3 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpthis, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpthis, tmpIfTest);
    return tmpReturnArg$9;
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
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpthis$1.foo;
      return tmpReturnArg$2;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpthis);
    return tmpReturnArg$8;
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
