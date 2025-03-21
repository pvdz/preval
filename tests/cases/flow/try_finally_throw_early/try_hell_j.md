# Preval test case

# try_hell_j.md

> Flow > Try finally throw early > Try hell j
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    x = 1
  } finally {
    throw_early
    // The finally always executes so there's no question that x mutates... unless it throws early
    x = 2
  }
}
considerMutated(x) // always true
`````


## Settled


`````js filename=intro
throw_early;
considerMutated(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
considerMutated(2);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
considerMutated( 2 );
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

throw_early, considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
