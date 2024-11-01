# Preval test case

# param2.md

> Static arg ops > Coerce > Assign > Closure > Param2

## Input

`````js filename=intro
let x = $({
  valueOf:function(){ $('PASS'); }
});
Number(x);                    // This should trigger a pass
const f = function (c) {
  // This $coerce gets eliminated because f is only called with numbers as first arg, so this coerce is a noop
  x = $coerce(c, 'number');
  $(1);
  $(2);
  $(c);
};
f(3);
f(4);
$(x);                         // This is $, not f
`````

## Pre Normal


`````js filename=intro
let x = $({
  valueOf: function () {
    debugger;
    $(`PASS`);
  },
});
Number(x);
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
const tmpCallCallee = $;
const tmpObjLitVal = function () {
  debugger;
  $(`PASS`);
  return undefined;
};
const tmpCalleeParam = { valueOf: tmpObjLitVal };
let x = tmpCallCallee(tmpCalleeParam);
$coerce(x, `number`);
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
const tmpObjLitVal /*:()=>undefined*/ = function () {
  debugger;
  $(`PASS`);
  return undefined;
};
const tmpCalleeParam /*:object*/ = { valueOf: tmpObjLitVal };
const x = $(tmpCalleeParam);
$coerce(x, `number`);
const f /*:(number)=>undefined*/ = function ($$0) {
  const c /*:number*/ = $$0;
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
const a = function() {
  debugger;
  $( "PASS" );
  return undefined;
};
const b = { valueOf: a };
const c = $( b );
$coerce( c, "number" );
const d = function($$0 ) {
  const e = f;
  debugger;
  $( 1 );
  $( 2 );
  $( e );
  return undefined;
};
d( 3 );
d( 4 );
$( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { valueOf: '"<function>"' }
 - 2: 'PASS'
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 1
 - 7: 2
 - 8: 4
 - 9: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same