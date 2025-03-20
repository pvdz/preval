# Preval test case

# try_hell_f.md

> Flow > Try finally throw early > Try hell f
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {

} catch {
  x = 1
} finally {
  throw_early
}
considerMutated(x) // always true
`````


## Settled


`````js filename=intro
throw_early;
considerMutated(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
considerMutated(0);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
considerMutated( 0 );
`````


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
