# Preval test case

# param_default_len.md

> Normalize > Arguments > Param default len
>
> The `arguments` object is a valid default expression

## Input

`````js filename=intro
function f(a = arguments.length) {
  return a;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpPrevalAliasArgumentsLen : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsLen;
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
const tmpPrevalAliasArgumentsLen = 0;
$(tmpPrevalAliasArgumentsLen);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
