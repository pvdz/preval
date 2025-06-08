# Preval test case

# spread_param_after.md

> Return param > Spread param after
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x, ...rest) {
  $('no', rest);
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
const f /*:()=>unknown*/ = function () {
  debugger;
  const rest /*:array*/ /*truthy*/ = [];
  $(`no`, rest);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(-2);
f();
$(-3);
f();
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`no`, []);
  $(`inlining`);
  $(`please`);
};
f();
$(-2);
f();
$(-3);
f();
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [];
  $( "no", b );
  $( "inlining" );
  $( "please" );
  return undefined;
};
a();
$( -2 );
a();
$( -3 );
a();
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, ...$$1 /*:array*/) {
  let x = $$0;
  let rest = $$1;
  debugger;
  $(`no`, rest);
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


- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no', []
 - 2: 'inlining'
 - 3: 'please'
 - 4: -2
 - 5: 'no', []
 - 6: 'inlining'
 - 7: 'please'
 - 8: -3
 - 9: 'no', []
 - 10: 'inlining'
 - 11: 'please'
 - 12: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
