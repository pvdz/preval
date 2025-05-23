# Preval test case

# try_hell_e.md

> Flow > Try finally throw early > Try hell e
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
try {
  x = 1
} catch {

} finally {
  throw_early
  x = 2
}
$(x);
`````


## Settled


`````js filename=intro
throw_early;
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  x = 1;
} catch (e) {}
throw_early;
x = 2;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
