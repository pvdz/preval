# Preval test case

# try_hell_a.md

> Flow > Try block throw early > Try hell a
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
  x = 1
} catch {

}
considerMutated(x) // always true
`````

## Settled


`````js filename=intro
let x /*:number*/ = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
`````

## Pre Normal


`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
`````

## Normalized


`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 0;
try {
  fail_early;
  a = 1;
}
catch (b) {

}
considerMutated( a );
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
