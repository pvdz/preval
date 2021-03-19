# Preval test case

# param_default.md

> Normalize > This > Param default
>
> The `this` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = this) {
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let a = tmpParamDefault === undefined ? this : tmpParamDefault;
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  const tmpPrevalAliasThis = this;
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, tmpPrevalAliasThis$1, a$1, tmpIfTest$1) {
    a$1 = tmpPrevalAliasThis$1;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, tmpPrevalAliasThis$1, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, tmpPrevalAliasThis$2, a$2, tmpIfTest$2) {
    a$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, tmpPrevalAliasThis$2, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, tmpPrevalAliasThis$3, a$3, tmpIfTest$3) {
    return a$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, tmpPrevalAliasThis, a, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, tmpPrevalAliasThis, a, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpPrevalAliasThis$1 = tmpPrevalAliasThis;
    const SSA_a$1 = tmpPrevalAliasThis$1;
    return SSA_a$1;
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
