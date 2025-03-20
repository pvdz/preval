# Preval test case

# base_single.md

> Inline identical param > Objlit > Base single
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj.a);
  $(obj.a);
}

f({a: 1});
f({a: 3});
`````


## Settled


`````js filename=intro
const f /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  $(a);
  $(a);
  return undefined;
};
f(1);
f(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a) {
  $(a);
  $(a);
};
f(1);
f(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  $( b );
  return undefined;
};
a( 1 );
a( 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
