# Preval test case

# in_func.md

> Tdz > In func
>
> A loop that just tests for an ident to trigger tdz is not a loop

## Input

`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    s;
  }
  return undefined;
};
f();
f();
`````


## Settled


`````js filename=intro
s;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
s;
`````


## PST Settled
With rename=true

`````js filename=intro
s;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

s


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
