# Preval test case

# try_hell_k.md

> Flow > Try block throw early > Try hell k
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
    // The break should not prevent this assignment from being picked up
    x = 2;
  } finally {
  }
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 0;
try {
  fail_early;
} catch (e) {
  x = 2;
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
try {
  fail_early;
} catch (e) {
  x = 2;
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
try {
  fail_early;
}
catch (b) {
  a = 2;
}
$( a );
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
    } catch (e) {
      try {
        x = 2;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
  }
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


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
