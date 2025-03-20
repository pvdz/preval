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
  const rest /*:array*/ = [];
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


## Todos triggered


- drop unused rest param?


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
