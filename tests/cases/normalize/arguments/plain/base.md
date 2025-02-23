# Preval test case

# base.md

> Normalize > Arguments > Plain > Base
>
> Base case for the special `arguments` builtin

## Input

`````js filename=intro
function f(a) {
  $(arguments[0]);
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  $(tmpPrevalAliasArgumentsAny[0]);
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpPrevalAliasArgumentsAny[0];
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const f /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpCalleeParam = tmpPrevalAliasArgumentsAny[0];
  $(tmpCalleeParam);
  return undefined;
};
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b[ 0 ];
  $( d );
  return undefined;
};
a();
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
