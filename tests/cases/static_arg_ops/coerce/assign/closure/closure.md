# Preval test case

# closure.md

> Static arg ops > Coerce > Assign > Closure > Closure

## Input

`````js filename=intro
let x = $('50');
let y = undefined;
const f = function (c) {
  y = $coerce(x, 'number');
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);
$(y);
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
let y = undefined;
const f = function ($$0) {
  let c = $$0;
  debugger;
  y = $coerce(x, `number`);
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);
$(y);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
let y = undefined;
const f = function ($$0) {
  let c = $$0;
  debugger;
  y = $coerce(x, `number`);
  $(1);
  $(2);
  $(c);
  return undefined;
};
f(3);
f(4);
$(x);
$(y);
`````

## Output


`````js filename=intro
const x = $(`50`);
const f = function ($$0) {
  const c /*:number*/ = $$0;
  debugger;
  $(1);
  $(2);
  $(c);
  return undefined;
};
$coerce(x, `number`);
f(3);
const tmpClusterSSA_y /*:number*/ = $coerce(x, `number`);
f(4);
$(x);
$(tmpClusterSSA_y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "50" );
const b = function($$0 ) {
  const c = d;
  debugger;
  $( 1 );
  $( 2 );
  $( c );
  return undefined;
};
$coerce( a, "number" );
b( 3 );
const e = $coerce( a, "number" );
b( 4 );
$( a );
$( e );
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
 - 8: '50'
 - 9: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
