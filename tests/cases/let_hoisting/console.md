# Preval test case

# console.md

> Let hoisting > Console
>
> console.log can be considered side effect free

## Input

`````js filename=intro
let f = function() {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
console.log('hi');
let x = $(2);
f();
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
console.log(`hi`);
$(x, `f`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const x = $(2);
console.log(`hi`);
$(x, `f`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
console.log( "hi" );
$( a, "f" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
