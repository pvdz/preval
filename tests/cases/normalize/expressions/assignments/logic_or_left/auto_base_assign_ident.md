# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Logic or left > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b = $(2)) || $(100));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
if (tmpNestedComplexRhs) {
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpNestedComplexRhs, tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
if (tmpNestedComplexRhs) {
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, tmpNestedComplexRhs);
} else {
  $($(100));
  $(tmpNestedComplexRhs, tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
if (a) {
  $( a );
  $( a, a );
}
else {
  const b = $( 100 );
  $( b );
  $( a, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
