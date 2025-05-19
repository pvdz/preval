# Preval test case

# try_hell_h.md

> Flow > Try block throw early > Try hell h
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
    if ($) break foo;
  } catch {
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
let x /*:number*/ = 0;
try {
  fail_early;
} catch (e) {
  x = 1;
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
  x = 1;
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
  a = 1;
}
$( a );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
