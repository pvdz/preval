# Preval test case

# binary_bad_left.md

> Return param > Binary bad left
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  const bad = $('please');
  
  const y = bad | x; // The ident blocks the trick
  return y;
}

$(f(1));
$(f(2));
$(f('three'));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const bad = $(`please`);
  const y = bad | x;
  return y;
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const bad = $(`please`);
  const y = bad | x;
  return y;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f /*:(primitive)=>number*/ = function ($$0) {
  const x /*:primitive*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const bad /*:unknown*/ = $(`please`);
  const y /*:number*/ = bad | x;
  return y;
};
const tmpCalleeParam /*:number*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = f(`three`);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "no" );
  $( "inlining" );
  const c = $( "please" );
  const d = c | b;
  return d;
};
const e = a( 1 );
$( e );
const f = a( 2 );
$( f );
const g = a( "three" );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 1
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: 2
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
