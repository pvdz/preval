# Preval test case

# try_catch.md

> Let aliases > Ai > Try catch
>
> Aliasing inside a try/catch block

## Input

`````js filename=intro
let x = $("val");
try {
  const a = x;
  const b = x;
  $(a, b);
} catch (e) {
  $(e);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
try {
  $(x, x);
} catch (e) {
  $(e);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
try {
  $(x, x);
} catch (e) {
  $(e);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
try {
  $( a, a );
}
catch (b) {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
try {
  const a = x;
  const b = x;
  $(a, x);
} catch (e) {
  $(e);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
