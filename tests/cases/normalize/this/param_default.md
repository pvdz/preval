# Preval test case

# param_default.md

> Normalize > This > Param default
>
> The `this` object is a valid default expression

## Input

`````js filename=intro
function f(a = this) {
  return a;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpPrevalAliasThis : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasThis;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
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
