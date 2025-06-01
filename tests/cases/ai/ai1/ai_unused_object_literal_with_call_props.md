# Preval test case

# ai_unused_object_literal_with_call_props.md

> Ai > Ai1 > Ai unused object literal with call props
>
> Test: Unused object literal whose property initializers are $() calls.

## Input

`````js filename=intro
// Expected: $("A"); $("B"); $("C"); (The object construction might be optimized away, or let x remain but be unused)
let x = {
  a: $("A"),
  b: $("B")
}; 
$("C"); // x is unused.
`````


## Settled


`````js filename=intro
$(`A`);
$(`B`);
$(`C`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
$(`B`);
$(`C`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
$( "B" );
$( "C" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`A`);
const tmpObjLitVal$1 = $(`B`);
let x = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
$(`C`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B'
 - 3: 'C'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
