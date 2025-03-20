# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) || $(100));
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  $(true);
  $(true, arg);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(false, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
if (delete tmpDeleteObj.y) {
  $(true);
  $(true, arg);
} else {
  $($(100));
  $(false, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
if (c) {
  $( true );
  $( true, a );
}
else {
  const d = $( 100 );
  $( d );
  $( false, a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
