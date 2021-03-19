# Preval test case

# param_default2.md

> Normalize > Arguments > Param default2
>
> The `arguments` object is a valid default expression

#TODO

## Input

`````js filename=intro
const f = function(a = arguments) {
  return a;
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function (tmpParamDefault) {
  let a = tmpParamDefault === undefined ? arguments : tmpParamDefault;
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, tmpPrevalAliasArgumentsAny$1, a$1, tmpIfTest$1) {
    a$1 = tmpPrevalAliasArgumentsAny$1;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, tmpPrevalAliasArgumentsAny$1, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, tmpPrevalAliasArgumentsAny$2, a$2, tmpIfTest$2) {
    a$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, tmpPrevalAliasArgumentsAny$2, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, tmpPrevalAliasArgumentsAny$3, a$3, tmpIfTest$3) {
    return a$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, tmpPrevalAliasArgumentsAny, a, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, tmpPrevalAliasArgumentsAny, a, tmpIfTest);
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
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpPrevalAliasArgumentsAny$1 = tmpPrevalAliasArgumentsAny;
    const SSA_a$1 = tmpPrevalAliasArgumentsAny$1;
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
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
