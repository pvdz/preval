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
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
    return a;
  } else {
    a = tmpParamDefault;
    return a;
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
    return tmpPrevalAliasArgumentsAny;
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
