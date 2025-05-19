# Preval test case

# try_hell_h.md

> Flow > Try finally throw early > Try hell h
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    if ($) break foo;
  } catch {
    // Now we know it can't get here
    // Though in real world code a throw can happen pretty much anywhere
    // So we must assume the worst and consider the catch potentially visited
    // So we must consider x might have mutated after the try is resolved
    x = 1
  } finally {
    throw_early
  }
}
$(x);
`````


## Settled


`````js filename=intro
throw_early;
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( 0 );
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
