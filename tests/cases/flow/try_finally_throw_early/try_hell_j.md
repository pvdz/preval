# Preval test case

# try_hell_j.md

> Flow > Try finally throw early > Try hell j
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    x = 1
  } finally {
    throw_early
    // The finally always executes so there's no question that x mutates... unless it throws early
    x = 2
  }
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
foo: {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      break $finally;
    } catch (e) {
      try {
        x = 1;
      } catch ($finalImplicit) {
        throw_early;
        x = 2;
        throw $finalImplicit;
      }
    }
  }
  throw_early;
  x = 2;
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
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
