# Preval test case

# arguments.md

> Static arg ops > Coerce > Assign > Closure > Arguments

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  x = $coerce(arguments, 'number');
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  debugger;
  x = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  debugger;
  x = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(c);
  return undefined;
};
f(3);
f(4);
$(x);
`````

## Output


`````js filename=intro
let x = $(`50`);
const f /*:(number)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  const c /*:number*/ = $$0;
  debugger;
  x = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(c);
  return undefined;
};
f(3);
f(4);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( "50" );
const b = function($$0 ) {
  const c = d;
  const e = $$0;
  debugger;
  a = $coerce( c, "number" );
  $( 1 );
  $( 2 );
  $( e );
  return undefined;
};
b( 3 );
b( 4 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 1
 - 6: 2
 - 7: 4
 - 8: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
