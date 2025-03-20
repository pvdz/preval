# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(1)) && $($(2))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_p /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_p) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  $(tmpCalleeParam$1);
  $(undefined);
} else {
  $(undefined);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($($(1))) {
  $($(2));
  $(undefined);
} else {
  $(undefined);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  $( c );
  $( undefined );
}
else {
  $( undefined );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
