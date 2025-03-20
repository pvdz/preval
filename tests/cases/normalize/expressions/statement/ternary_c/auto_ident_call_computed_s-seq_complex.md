# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Ternary c > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : (1, 2, b)[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpCallCompProp /*:unknown*/ = $(`\$`);
  const b /*:object*/ = { $: $ };
  b[tmpCallCompProp](1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpCallCompProp = $(`\$`);
  ({ $: $ }[tmpCallCompProp](1));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  const c = $( "$" );
  const d = { $: $ };
  d[ c ]( 1 );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
