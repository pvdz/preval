# Preval test case

# opaque_func_param.md

> Ai > Ai5 > Opaque func param
>
> Test preservation of opaque value function parameters

## Input

`````js filename=intro
const x = $("test");
function f(a) { return a; }
const y = f(x);
$(y);

// Expected:
// const x = $("test");
// const y = x;
// $(y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`test`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
$( a );
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
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
