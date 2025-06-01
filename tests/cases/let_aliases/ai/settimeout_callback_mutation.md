# Preval test case

# settimeout_callback_mutation.md

> Let aliases > Ai > Settimeout callback mutation
>
> Mutation in a setTimeout callback (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
setTimeout(() => { x = "changed"; }, 0);
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpCalleeParam /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
setTimeout(tmpCalleeParam, 0);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
setTimeout(function () {
  x = `changed`;
}, 0);
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = function() {
  debugger;
  a = "changed";
  return undefined;
};
setTimeout( c, 0 );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
let tmpCalleeParam = function () {
  debugger;
  x = `changed`;
  return undefined;
};
setTimeout(tmpCalleeParam, 0);
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
