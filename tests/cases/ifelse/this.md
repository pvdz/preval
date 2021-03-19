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
  if ($(1)) {
    if ($(2)) {
      return this;
    }
  }
};
const obj = { f, foo: 10 };
$(obj.f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasThis$1, tmpIfTest$2) {
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function (tmpPrevalAliasThis$4, tmpIfTest$6, tmpIfTest$7) {
      return tmpPrevalAliasThis$4;
    };
    const tmpBranchingB$1 = function (tmpPrevalAliasThis$5, tmpIfTest$8, tmpIfTest$9) {
      const tmpReturnArg = tmpBranchingC$1(tmpPrevalAliasThis$5, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg;
    };
    const tmpBranchingC$1 = function (tmpPrevalAliasThis$6, tmpIfTest$10, tmpIfTest$11) {
      const tmpReturnArg$1 = tmpBranchingC(tmpPrevalAliasThis$6, tmpIfTest$10);
      return tmpReturnArg$1;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpBranchingA$1(tmpPrevalAliasThis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingB$1(tmpPrevalAliasThis$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$3;
    }
  };
  const tmpBranchingB = function (tmpPrevalAliasThis$2, tmpIfTest$4) {
    const tmpReturnArg$4 = tmpBranchingC(tmpPrevalAliasThis$2, tmpIfTest$4);
    return tmpReturnArg$4;
  };
  const tmpBranchingC = function (tmpPrevalAliasThis$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpPrevalAliasThis, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$6 = tmpBranchingB(tmpPrevalAliasThis, tmpIfTest);
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
  const tmpPrevalAliasThis = this;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasThis$1) {
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpPrevalAliasThis$1;
      return tmpReturnArg$2;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpPrevalAliasThis);
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
