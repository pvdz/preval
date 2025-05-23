# Preval test case

# try_hell_e.md

> Flow > Try catch throw early > Try hell e
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
try {
  throw_early
} catch {
  throw_early
  // Should not pick up on this
  x = 1
} finally {

}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 0;
let $implicitThrow /*:boolean*/ = false;
let $finalCatchArg /*:unknown*/ = undefined;
try {
  throw_early;
} catch (e) {
  try {
    throw_early;
    x = 1;
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  throw_early;
} catch (e) {
  try {
    throw_early;
    x = 1;
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
let b = false;
let c = undefined;
try {
  throw_early;
}
catch (d) {
  try {
    throw_early;
    a = 1;
  }
  catch (e) {
    b = true;
    c = e;
  }
}
if (b) {
  throw c;
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  throw_early;
} catch (e) {
  try {
    throw_early;
    x = 1;
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
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
