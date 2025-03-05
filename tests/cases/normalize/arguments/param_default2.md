# Preval test case

# param_default2.md

> Normalize > Arguments > Param default2
>
> The `arguments` object is a valid default expression

## Input

`````js filename=intro
const f = function(a = arguments) {
  return a;
};
$(f());
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpPrevalAliasArgumentsAny : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
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
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:(unused)=>arguments*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam /*:arguments*/ = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  return b;
};
const d = a();
$( d );
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
