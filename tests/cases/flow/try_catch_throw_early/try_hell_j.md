# Preval test case

# try_hell_j.md

> Flow > Try catch throw early > Try hell j
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    throw_early
  } finally {
    // The finally always executes so there's no question that x mutates
    x = 1
  }
}
considerMutated(x) // always true
`````


## Settled


`````js filename=intro
considerMutated(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
considerMutated(1);
`````


## PST Settled
With rename=true

`````js filename=intro
considerMutated( 1 );
`````


## Globals


BAD@! Found 1 implicit global bindings:

considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
