# Preval test case

# try_hell_h.md

> Flow > Try block throw early > Try hell h
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    fail_early
    if ($) break foo;
  } catch {
    // Now we know it can't get here
    // Though in real world code a throw can happen pretty much anywhere
    // So we must assume the worst and consider the catch potentially visited
    // So we must consider x might have mutated after the try is resolved
    x = 1
  } finally {
  
  }
}
considerMutated(x) // always true
`````


## Settled


`````js filename=intro
fail_early;
considerMutated(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
fail_early;
considerMutated(0);
`````


## PST Settled
With rename=true

`````js filename=intro
fail_early;
considerMutated( 0 );
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

fail_early, considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
