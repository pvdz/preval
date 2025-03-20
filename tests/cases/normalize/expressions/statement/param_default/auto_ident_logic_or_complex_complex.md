# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || $($(2))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_p /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_p) {
  $(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  $(tmpCalleeParam$1);
  $(undefined);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($($(0))) {
  $(undefined);
} else {
  $($(2));
  $(undefined);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( undefined );
}
else {
  const c = $( 2 );
  $( c );
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
