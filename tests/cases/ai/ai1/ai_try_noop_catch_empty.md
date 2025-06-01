# Preval test case

# ai_try_noop_catch_empty.md

> Ai > Ai1 > Ai try noop catch empty
>
> Test: Try-catch removal if try block has only non-throwing primitive assignments and catch is empty.

## Input

`````js filename=intro
// Expected: let a = 123; let b = "text"; $("out", a, b); $("done");
let a = 1;
let b = "foo";
try {
  a = 123;       // Non-throwing
  b = "text";    // Non-throwing
  $("out", a, b); // Assume $() can throw, so keep it, but it determines a,b are used
} catch (e) {
  // Empty catch
}
$("done");
`````


## Settled


`````js filename=intro
try {
  $(`out`, 123, `text`);
} catch (e) {}
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`out`, 123, `text`);
} catch (e) {}
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "out", 123, "text" );
}
catch (a) {

}
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = `foo`;
try {
  a = 123;
  b = `text`;
  $(`out`, a, b);
} catch (e) {}
$(`done`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'out', 123, 'text'
 - 2: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
