# Preval test case

# ai_try_nonthrowing_empty_catch_retest.md

> Ai > Ai1 > Ai try nonthrowing empty catch retest
>
> Test: Try-catch removal if try block is non-throwing and catch is empty (re-test of Rule 17 behavior).

## Input

`````js filename=intro
// Expected: let a = 1; a = 123; $('out', a);
let a = 1;
try {
  a = 123;       // Non-throwing assignment
} catch (e) {
  // Empty catch, e is unused
}
$('out', a); // Verify value after the try-catch
`````


## Settled


`````js filename=intro
$(`out`, 123);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out`, 123);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "out", 123 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
try {
  a = 123;
} catch (e) {}
$(`out`, a);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'out', 123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
