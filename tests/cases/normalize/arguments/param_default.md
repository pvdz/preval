# Preval test case

# param_default.md

> Normalize > Arguments > Param default
>
> The `arguments` object is a valid default expression

## Input

`````js filename=intro
function f(a = arguments) {
  return a;
}
$(f(1, 2, 3));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpPrevalAliasArgumentsAny : tmpParamBare;
  return a;
};
$(f(1, 2, 3));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
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
