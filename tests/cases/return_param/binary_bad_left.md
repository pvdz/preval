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


## Settled


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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  const y = $(`please`) | x;
  return y;
};
$(f(1));
$(f(2));
$(f(`three`));
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


## Normalized
(This is what phase1 received the first time)

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
let tmpCalleeParam = f(1);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
`````


## Todos triggered


None


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
 - 12: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
