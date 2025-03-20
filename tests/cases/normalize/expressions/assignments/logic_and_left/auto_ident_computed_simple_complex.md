# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = b[$("c")]) && $(100));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const a /*:unknown*/ = b[tmpAssignRhsCompProp];
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a, b);
} else {
  $(a);
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
const a = b[tmpAssignRhsCompProp];
if (a) {
  $($(100));
  $(a, b);
} else {
  $(a);
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
if (c) {
  const d = $( 100 );
  $( d );
  $( c, b );
}
else {
  $( c );
  $( c, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 100
 - 3: 100
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
