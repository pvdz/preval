# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const arg /*:object*/ /*truthy*/ = { y: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteObj /*:unknown*/ = $(arg);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const arg = { y: 1 };
if (tmpIfTest) {
  $($(100));
  $({ a: 999, b: 1000 }, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = { y: 1 };
if (a) {
  const c = $( 100 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, b );
}
else {
  $( 1 );
  $( 2 );
  const e = $( b );
  const f = delete e.y;
  $( f );
  $( f, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, arg);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: true
 - 6: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
