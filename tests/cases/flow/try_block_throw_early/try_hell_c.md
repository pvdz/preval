# Preval test case

# try_hell_c.md

> Flow > Try block throw early > Try hell c
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
} finally {
  x = 1
}
considerMutated(x) // always true
`````


## Settled


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {
  throw $finalImplicit;
}
considerMutated(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {
  throw $finalImplicit;
}
considerMutated(1);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {
  throw a;
}
considerMutated( 1 );
`````


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
