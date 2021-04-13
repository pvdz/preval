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
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpthis.foo;
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$7 = tmpBranchingC();
      return tmpReturnArg$7;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$13 = tmpBranchingC();
    return tmpReturnArg$13;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA();
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB();
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
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpthis.foo;
      return tmpReturnArg$3;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA();
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
