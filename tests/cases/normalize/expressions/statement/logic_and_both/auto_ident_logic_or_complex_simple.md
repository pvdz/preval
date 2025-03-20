# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || 2) && ($($(0)) || 2);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(0);
  $(tmpCalleeParam$1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = $($(0));
if (!tmpIfTest) {
  tmpIfTest = true;
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $($(0));
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = true;
}
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = $( 0 );
  $( d );
  $( c );
}
else {
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
