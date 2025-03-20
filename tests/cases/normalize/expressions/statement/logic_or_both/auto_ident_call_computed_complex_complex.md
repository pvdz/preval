# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)[$("$")](1) || $(b)[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const tmpIfTest /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCallCompObj$1 /*:unknown*/ = $(b);
  const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
  tmpCallCompObj$1[tmpCallCompProp$1](1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $(`\$`);
  tmpCallCompObj$1[tmpCallCompProp$1](1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ]( 1 );
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( e );
}
else {
  const f = $( a );
  const g = $( "$" );
  f[ g ]( 1 );
  $( e );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
