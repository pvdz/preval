# Preval test case

# try_catch_rethrow_mutation.md

> Let aliases > Ai > Try catch rethrow mutation
>
> Mutation in a try/catch with rethrow (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  throw 1;
} catch (e) {
  x = "changed";
  throw e;
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
$(`val`);
try {
  throw 1;
} catch (e) {
  throw e;
}
throw `Preval: This statement contained a read that reached no writes: binding: x, code: x;`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`val`);
try {
  throw 1;
} catch (e) {
  throw e;
}
throw `Preval: This statement contained a read that reached no writes: binding: x, code: x;`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "val" );
try {
  throw 1;
}
catch (a) {
  throw a;
}
throw "Preval: This statement contained a read that reached no writes: binding: x, code: x;";
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
  throw e;
}
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
