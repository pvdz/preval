# Preval test case

# arguments.md

> Static arg ops > Coerce > Assign > Param > Arguments

## Input

`````js filename=intro
let x = $('50');
const f = function (c, d) {
  $coerce(arguments, 'number');
  $(1);
  $(2);
  $(d);
};
f(3);
f(4);
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  let d = $$1;
  debugger;
  $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(d);
};
f(3);
f(4);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
const f = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  let d = $$1;
  debugger;
  $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(d);
  return undefined;
};
f(3);
f(4);
`````

## Output


`````js filename=intro
$(`50`);
const f /*:(number, unknown)=>*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const d = $$1;
  debugger;
  $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(d);
  return undefined;
};
f(3);
f(4);
`````

## PST Output

With rename=true

`````js filename=intro
$( "50" );
const a = function($$0,$$1 ) {
  const b = c;
  const d = e;
  debugger;
  $coerce( b, "number" );
  $( 1 );
  $( 2 );
  $( d );
  return undefined;
};
a( 3 );
a( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: undefined
 - 5: 1
 - 6: 2
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
