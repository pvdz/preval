# Preval test case

# spread_param_unary.md

> Return param > Spread param unary
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(...x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  return y;
}

$(f(1));
$(f(2));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:(array)=>number*/ = function (...$$0 /*:array*/) {
  const x /*:array*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y /*:number*/ = ~x;
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
const f = function (...$$0 /*:array*/) {
  const x = $$0;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
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
  $( "please" );
  const c = ~b;
  return c;
};
const d = a( 1 );
$( d );
const e = a( 2 );
$( e );
const f = a( "three" );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
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
 - 4: -2
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: -3
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
