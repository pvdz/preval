# Preval test case

# try_hell_b.md

> Flow > Try finally throw early > Try hell b
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {

} catch {
  throw_early
  x = 1
}
considerMutated(x) // always true
`````

## Settled


`````js filename=intro
considerMutated(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
considerMutated(0);
`````

## Pre Normal


`````js filename=intro
let x = 0;
try {
} catch (e) {
  throw_early;
  x = 1;
}
considerMutated(x);
`````

## Normalized


`````js filename=intro
let x = 0;
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
considerMutated( 0 );
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
