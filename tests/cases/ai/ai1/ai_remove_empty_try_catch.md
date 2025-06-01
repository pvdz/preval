# Preval test case

# ai_remove_empty_try_catch.md

> Ai > Ai1 > Ai remove empty try catch
>
> Test: An empty try {} catch(e) {} block should be removed.

## Input

`````js filename=intro
// Expected: $("one"); $("two"); (or $("one"); ; $("two");)
$("one");
try {
  // This block is empty
} catch (e) {
  // This block is also empty
}
$("two");
`````


## Settled


`````js filename=intro
$(`one`);
$(`two`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`one`);
$(`two`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "one" );
$( "two" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`one`);
$(`two`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'one'
 - 2: 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
