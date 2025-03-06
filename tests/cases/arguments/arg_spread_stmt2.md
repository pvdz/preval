# Preval test case

# arg_spread_stmt2.md

> Arguments > Arg spread stmt2
>
> Arguments can be spread but this should not be observable

## Input

`````js filename=intro
function f(a) {
  [...arguments];
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  [...tmpPrevalAliasArgumentsAny];
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  [...tmpPrevalAliasArgumentsAny];
  return undefined;
};
f();
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

Todos triggered:
- switch me to ref tracking