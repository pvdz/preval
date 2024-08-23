# Preval test case

# param.md

> Static arg ops > Coerce > Assign > Closure > Param

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  x = $coerce(c, 'number');
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
  let c = $$0;
  debugger;
  x = $coerce(c, `number`);
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
  let c = $$0;
  debugger;
  x = $coerce(c, `number`);
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
$(`50`);
const f = function ($$0) {
  const c = $$0;
  debugger;
  $(1);
  $(2);
  $(c);
  return undefined;
};
f(3);
f(4);
$(4);
`````

## PST Output

With rename=true

`````js filename=intro
$( "50" );
const a = function($$0 ) {
  const b = c;
  debugger;
  $( 1 );
  $( 2 );
  $( b );
  return undefined;
};
a( 3 );
a( 4 );
$( 4 );
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
 - 8: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
