# Preval test case

# ai_try_nonthrowing_catch_empty.md

> Ai > Ai1 > Ai try nonthrowing catch empty
>
> Test: Try-catch removal if try block has only non-throwing primitive assignments and catch is empty.

## Input

`````js filename=intro
// Expected: let a = 1; let b = "foo"; a = 123; b = "text"; $("out", a, b);
let a = 1;
let b = "foo";
try {
  a = 123;       // Non-throwing assignment
  b = "text";    // Non-throwing assignment
} catch (e) {
  // Empty catch
}
$("out", a, b); // Verify values after the try-catch
`````


## Settled


`````js filename=intro
$(`out`, 123, `text`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out`, 123, `text`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "out", 123, "text" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = `foo`;
try {
  a = 123;
  b = `text`;
} catch (e) {}
$(`out`, a, b);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'out', 123, 'text'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
