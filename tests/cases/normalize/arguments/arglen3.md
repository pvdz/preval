# Preval test case

# arglen3.md

> Normalize > Arguments > Arglen3
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
const f = function() {
  $(arguments.length);
}
f();
`````

## Pre Normal


`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  $(tmpPrevalAliasArgumentsLen);
};
f();
`````

## Normalized


`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  $(tmpPrevalAliasArgumentsLen);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
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
