# Preval test case

# bug_minimal_try_catch.md

> Const aliasing > Bug minimal try catch
>
> Try/catch: mutation in catch block after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  throw 1;
} catch (e) {
  x = "changed";
}
$(a, x);
// Expectation: a === "val", x === "changed". Aliasing is not safe.
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
try {
  throw 1;
} catch (e) {}
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
try {
  throw 1;
} catch (e) {}
$(x, `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
try {
  throw 1;
}
catch (b) {

}
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  throw 1;
} catch (e) {
  x = `changed`;
}
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
