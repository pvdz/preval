# Preval test case

# try_hell_c.md

> Flow > Try finally throw early > Try hell c
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
try {

} finally {
  throw_early
  x = 1 // Do not inline
}
$(x);
`````


## Settled


`````js filename=intro
throw_early;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
throw_early;
x = 1;
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
