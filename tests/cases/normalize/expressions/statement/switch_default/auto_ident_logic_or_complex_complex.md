# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Switch default > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $($(0)) || $($(2));
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  $(tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpIfTest = $($(0));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $($(2));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  const d = $( 2 );
  $( d );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
