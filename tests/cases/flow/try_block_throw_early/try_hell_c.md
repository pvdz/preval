# Preval test case

# try_hell_c.md

> Flow > Try block throw early > Try hell c
>
> Bunch of try/catch/finally cases

## Options

- globals: fail_early

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
} finally {
  x = 1
}
$(x);
`````


## Settled


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {
  throw $finalImplicit;
}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {
  throw $finalImplicit;
}
$(1);
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
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  fail_early;
} catch ($finalImplicit) {
  x = 1;
  throw $finalImplicit;
}
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
