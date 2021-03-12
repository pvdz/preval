# Preval test case

# param_default.md

> Normalize > Arguments > Param default
>
> The `arguments` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = arguments) {
  return a;
}
$(f(1, 2, 3));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let a = tmpParamDefault === undefined ? arguments : tmpParamDefault;
  return a;
};
$(f(1, 2, 3));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
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
const tmpCalleeParam = f(1, 2, 3);
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
const tmpCalleeParam = f(1, 2, 3);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
