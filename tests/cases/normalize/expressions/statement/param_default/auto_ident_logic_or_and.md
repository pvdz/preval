# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || ($($(1)) && $($(2)))) {}
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
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_p$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_p$1) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
    $(undefined);
  } else {
    $(undefined);
  }
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
  if ($($(1))) {
    $($(2));
    $(undefined);
  } else {
    $(undefined);
  }
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
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    $( e );
    $( undefined );
  }
  else {
    $( undefined );
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
