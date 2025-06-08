# Preval test case

# non_return_outlining.md

> Tofix > non return outlining
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Existing test case

In src/reduce_static/return_param.mjs we are only outlining
the return value if it is a local var. But in this case we can
outline the x.toString read as well, which should lead to being
able to eliminate the arg, resolve the toString()'s and get back
to whole resolvement.
also: tests/cases/return/return_param_method.md

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x.toString();
  return y;
}

$(f([1, 2, 3]));
$(f(300));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>unknown*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpMCF /*:unknown*/ = x.toString;
  const y /*:unknown*/ = $dotCall(tmpMCF, x, `toString`);
  return y;
};
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpCalleeParam /*:unknown*/ = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCalleeParam$3 /*:unknown*/ = f(300);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = f(`three`);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x.toString();
  return y;
};
$(f([1, 2, 3]));
$(f(300));
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
  const c = b.toString;
  const d = $dotCall( c, b, "toString" );
  return d;
};
const e = [ 1, 2, 3 ];
const f = a( e );
$( f );
const g = a( 300 );
$( g );
const h = a( "three" );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpMCF = x.toString;
  const y = $dotCall(tmpMCF, x, `toString`);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [1, 2, 3];
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
let tmpCalleeParam$3 = f(300);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(`three`);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: '1,2,3'
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: '300'
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
