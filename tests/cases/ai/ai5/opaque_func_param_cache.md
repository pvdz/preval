# Preval test case

# opaque_func_param_cache.md

> Ai > Ai5 > Opaque func param cache
>
> Test caching of function parameters for opaque values

## Input

`````js filename=intro
const x = $("test");
function f(a) { return a; }
const y = f(x);
const z = f(x);
$(y + z);

// Expected:
// const x = $("test");
// function f(a) { return a; }
// const param = x;
// const y = f(param);
// const z = f(param);
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpCalleeParam /*:primitive*/ = x + x;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
$(x + x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a + a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const x = $(`test`);
const y = f(x);
const z = f(x);
let tmpCalleeParam = y + z;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'testtest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
