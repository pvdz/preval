# Preval test case

# argslen.md

> Static arg ops > Coerce > Assign > Closure > Argslen

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  x = $coerce(arguments.length, 'number');
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
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let c = $$0;
  debugger;
  x = $coerce(tmpPrevalAliasArgumentsLen, `number`);
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
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let c = $$0;
  debugger;
  x = $coerce(tmpPrevalAliasArgumentsLen, `number`);
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
const f = function ($$0) {
  const c = $$0;
  debugger;
  const tmpPrevalAliasArgumentsLen = 1;
  x = tmpPrevalAliasArgumentsLen;
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
  debugger;
  const e = 1;
  a = e;
  $( 1 );
  $( 2 );
  $( c );
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
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
