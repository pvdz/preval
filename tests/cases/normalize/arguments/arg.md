# Preval test case

# arg.md

> Normalize > Arguments > Arg
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsAny);
};
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsAny);
  return undefined;
};
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
