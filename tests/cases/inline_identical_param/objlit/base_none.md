# Preval test case

# base_none.md

> Inline identical param > Objlit > Base none
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj);
  $(obj);
}

f({});
f({});
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const obj /*:object*/ /*truthy*/ = {};
  $(obj);
  $(obj);
  return undefined;
};
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const obj = {};
  $(obj);
  $(obj);
};
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = {};
  $( b );
  $( b );
  return undefined;
};
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj);
  $(obj);
  return undefined;
};
const tmpCallCallee = f;
let tmpCalleeParam = {};
f(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$1 = {};
f(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
