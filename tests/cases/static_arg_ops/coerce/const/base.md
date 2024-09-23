# Preval test case

# base.md

> Static arg ops > Coerce > Const > Base

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(x, 'number');
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
  let c = $$0;
  debugger;
  const y = $coerce(x, `number`);
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
  let c = $$0;
  debugger;
  const y = $coerce(x, `number`);
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
const x = $(`50`);
const f /*:()=>*/ = function () {
  debugger;
  const y /*:number*/ = $coerce(x, `number`);
  $(1);
  $(2);
  $(y);
  return undefined;
};
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "50" );
const b = function() {
  debugger;
  const c = $coerce( a, "number" );
  $( 1 );
  $( 2 );
  $( c );
  return undefined;
};
b();
b();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: 50
 - 5: 1
 - 6: 2
 - 7: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
