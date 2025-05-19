# Preval test case

# try_hell_h.md

> Flow > Try catch throw early > Try hell h
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
    throw_early
    // Now we know it can't get here
    // Though in real world code a throw can happen pretty much anywhere
    // So we must assume the worst and consider the catch potentially visited
    // So we must consider x might have mutated after the try is resolved
    x = 1
  } finally {
  
  }
}
$(x);
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
