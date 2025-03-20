# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || $($(2));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  $(tmpCalleeParam$1);
  $(a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(0));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  $($(2));
  $(a);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
  $( undefined );
}
else {
  const d = $( 2 );
  $( d );
  $( c );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
