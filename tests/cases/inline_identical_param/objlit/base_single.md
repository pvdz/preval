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
  const a$1 /*:number*/ = $$0;
  debugger;
  $(a$1);
  $(a$1);
  return undefined;
};
f(1);
f(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a$1) {
  $(a$1);
  $(a$1);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  let tmpCalleeParam = obj.a;
  $(tmpCalleeParam);
  let tmpCalleeParam$1 = obj.a;
  $(tmpCalleeParam$1);
  return undefined;
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = { a: 1 };
f(tmpCalleeParam$3);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = { a: 3 };
f(tmpCalleeParam$5);
`````


## Todos triggered


None


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
