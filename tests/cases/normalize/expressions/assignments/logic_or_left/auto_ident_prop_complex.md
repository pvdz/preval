# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b).c) || $(100));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpAssignRhsProp.c;
if (a) {
  $(a);
  $(a, b);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const a = $(b).c;
if (a) {
  $(a);
  $(a, b);
} else {
  $($(100));
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
if (c) {
  $( c );
  $( c, a );
}
else {
  const d = $( 100 );
  $( d );
  $( c, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
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
 - 1: { c: '1' }
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
