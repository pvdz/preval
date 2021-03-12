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
  if (tmpIfTest) {
    a = tmpPrevalAliasThis;
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
  const tmpPrevalAliasThis = this;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    return tmpPrevalAliasThis;
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
