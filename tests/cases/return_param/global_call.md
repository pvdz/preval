# Preval test case

# global_call.md

> Return param > Global call
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  const bad = $('please');
  
  const y = x | bad; // The ident blocks the trick
  return y;
}

$(f(1));
$(f(2));
f('three');
`````

## Settled


`````js filename=intro
const f /*:(primitive)=>number*/ = function ($$0) {
  const x /*:primitive*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const bad /*:unknown*/ = $(`please`);
  const y /*:number*/ = x | bad;
  return y;
};
const tmpCalleeParam /*:number*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = f(2);
$(tmpCalleeParam$1);
f(`three`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  const y = x | $(`please`);
  return y;
};
$(f(1));
$(f(2));
f(`three`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const bad = $(`please`);
  const y = x | bad;
  return y;
};
$(f(1));
$(f(2));
f(`three`);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const bad = $(`please`);
  const y = x | bad;
  return y;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
f(`three`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "no" );
  $( "inlining" );
  const c = $( "please" );
  const d = b | c;
  return d;
};
const e = a( 1 );
$( e );
const f = a( 2 );
$( f );
a( "three" );
`````

## Globals

None

## Runtime Outcome

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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
