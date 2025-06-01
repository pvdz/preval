# Preval test case

# nested_catch_shadowing.md

> Let aliases > Ai > Nested catch shadowing
>
> Assignment to a variable with the same name as let, but in a catch block (should alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  throw 1;
} catch (x) {
  x = 2;
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
try {
  throw 1;
} catch (x$1) {}
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
try {
  throw 1;
} catch (x$1) {}
$(x, x);
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
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  throw 1;
} catch (x$1) {
  x$1 = 2;
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
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
