# Preval test case

# arguments.md

> Static arg ops > Coerce > Const > Arguments

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(arguments, 'number');
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  debugger;
  const y = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  debugger;
  const y = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(y);
  return undefined;
};
f(3);
f(4);
`````

## Output


`````js filename=intro
$(`50`);
const f /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const y /*:number*/ = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(y);
  return undefined;
};
f(3);
f(4);
`````

## PST Output

With rename=true

`````js filename=intro
$( "50" );
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = $coerce( b, "number" );
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
 - 4: NaN
 - 5: 1
 - 6: 2
 - 7: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
