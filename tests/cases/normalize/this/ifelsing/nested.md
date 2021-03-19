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
    if ($(1)) {
      if ($(2)) {
        return this.foo;
      }
    }
  },
};
$(a.f());
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = 10;
const tmpObjLitVal$1 = function f() {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasThis$1, tmpIfTest$2) {
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function (tmpPrevalAliasThis$4, tmpIfTest$6, tmpIfTest$7) {
      const tmpReturnArg$2 = tmpPrevalAliasThis$4.foo;
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpPrevalAliasThis$5, tmpIfTest$8, tmpIfTest$9) {
      const tmpReturnArg$3 = tmpBranchingC$1(tmpPrevalAliasThis$5, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpPrevalAliasThis$6, tmpIfTest$10, tmpIfTest$11) {
      const tmpReturnArg$4 = tmpBranchingC(tmpPrevalAliasThis$6, tmpIfTest$10);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpPrevalAliasThis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(tmpPrevalAliasThis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function (tmpPrevalAliasThis$2, tmpIfTest$4) {
    const tmpReturnArg$7 = tmpBranchingC(tmpPrevalAliasThis$2, tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function (tmpPrevalAliasThis$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpPrevalAliasThis, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpPrevalAliasThis, tmpIfTest);
    return tmpReturnArg$9;
  }
};
const a = { foo: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee = $;
const tmpCalleeParam = a.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = function f() {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasThis$1) {
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      let tmpPrevalAliasThis$4 = tmpPrevalAliasThis$1;
      const tmpReturnArg$2 = tmpPrevalAliasThis$4.foo;
      return tmpReturnArg$2;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpPrevalAliasThis);
    return tmpReturnArg$8;
  } else {
    return undefined;
  }
};
const a = { foo: 10, f: tmpObjLitVal$1 };
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
