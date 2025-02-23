# Preval test case

# bool_arguments.md

> Tofix > bool arguments
>

(existing test)

Arguments is an object, always truthy.
Maybe this is a general case; Boolean() on a type that we've identified as a certain
set of types like object, array, arguments, promise, etc, is always true.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(!!arguments, x, z);
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  return $(!!tmpPrevalAliasArgumentsAny, x, z);
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpCallCallee = $;
  const tmpUnaryArg = !tmpPrevalAliasArgumentsAny;
  const tmpCalleeParam = !tmpUnaryArg;
  const tmpCalleeParam$1 = x;
  const tmpCalleeParam$3 = z;
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return tmpReturnArg;
};
f();
`````

## Output


`````js filename=intro
const f /*:(undefined, undefined, undefined)=>undefined*/ = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpCalleeParam /*:boolean*/ = Boolean(tmpPrevalAliasArgumentsAny);
  $(tmpCalleeParam, undefined, undefined);
  return undefined;
};
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = c;
  debugger;
  const d = Boolean( b );
  $( d, undefined, undefined );
  return undefined;
};
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
