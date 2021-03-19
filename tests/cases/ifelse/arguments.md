# Preval test case

# arguments.md

> Ifelse > Arguments
>
> Return this

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return arguments;
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
      return arguments;
    }
  }
};
const obj = { f, foo: 10 };
$(obj.f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasArgumentsAny$1, tmpIfTest$2) {
    const tmpIfTest$3 = $(2);
    const tmpBranchingA$1 = function (tmpPrevalAliasArgumentsAny$4, tmpIfTest$6, tmpIfTest$7) {
      return tmpPrevalAliasArgumentsAny$4;
    };
    const tmpBranchingB$1 = function (tmpPrevalAliasArgumentsAny$5, tmpIfTest$8, tmpIfTest$9) {
      const tmpReturnArg = tmpBranchingC$1(tmpPrevalAliasArgumentsAny$5, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg;
    };
    const tmpBranchingC$1 = function (tmpPrevalAliasArgumentsAny$6, tmpIfTest$10, tmpIfTest$11) {
      const tmpReturnArg$1 = tmpBranchingC(tmpPrevalAliasArgumentsAny$6, tmpIfTest$10);
      return tmpReturnArg$1;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpBranchingA$1(tmpPrevalAliasArgumentsAny$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingB$1(tmpPrevalAliasArgumentsAny$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$3;
    }
  };
  const tmpBranchingB = function (tmpPrevalAliasArgumentsAny$2, tmpIfTest$4) {
    const tmpReturnArg$4 = tmpBranchingC(tmpPrevalAliasArgumentsAny$2, tmpIfTest$4);
    return tmpReturnArg$4;
  };
  const tmpBranchingC = function (tmpPrevalAliasArgumentsAny$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpPrevalAliasArgumentsAny, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$6 = tmpBranchingB(tmpPrevalAliasArgumentsAny, tmpIfTest);
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
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpPrevalAliasArgumentsAny$1) {
    const tmpIfTest$3 = $(2);
    if (tmpIfTest$3) {
      const tmpReturnArg$2 = tmpPrevalAliasArgumentsAny$1;
      return tmpReturnArg$2;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(tmpPrevalAliasArgumentsAny);
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
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
