# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1)) || (a = $(1)));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs /*:unknown*/ = $(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs = $(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( a );
  $( a );
}
else {
  const b = $( 1 );
  $( b );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
