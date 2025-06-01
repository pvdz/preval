# Preval test case

# ai_unused_object_literal_primitive_props.md

> Ai > Ai1 > Ai unused object literal primitive props
>
> Test: Unused object literal with only primitive literal property initializers.

## Input

`````js filename=intro
// Expected: $('C');
let x = {
  a: 1,           // primitive literal
  b: 'two',       // primitive literal
  c: true         // primitive literal
};
// x is unused. Object creation with only primitive literals should be side-effect free and removable.
$('C');
`````


## Settled


`````js filename=intro
$(`C`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`C`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "C" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = { a: 1, b: `two`, c: true };
$(`C`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
