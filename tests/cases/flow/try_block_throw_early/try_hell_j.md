# Preval test case

# try_hell_j.md

> Flow > Try block throw early > Try hell j
>
> Bunch of try/catch/finally cases

## Options

- globals: fail_early

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    fail_early
    break foo;
  } catch {
  
  } finally {
    // The finally always executes so there's no question that x mutates
    x = 1
  }
}
$(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
foo: {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      fail_early;
      $finalStep = true;
      break $finally;
    } catch (e) {}
  }
  x = 1;
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      break foo;
    } else {
    }
  }
}
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
