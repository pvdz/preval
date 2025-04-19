# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b[$("$")](1) && b[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpCallCompVal /*:unknown*/ = b[tmpCallCompProp];
const tmpIfTest /*:unknown*/ = $dotCall(tmpCallCompVal, b, undefined, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpCallCompVal$1 /*:unknown*/ = b[tmpCallCompProp$1];
  $dotCall(tmpCallCompVal$1, b, undefined, 1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const tmpIfTest = b[tmpCallCompProp](1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallCompProp$1 = $(`\$`);
  b[tmpCallCompProp$1](1);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  const f = $( "$" );
  const g = b[ f ];
  $dotCall( g, b, undefined, 1 );
  $( e );
}
else {
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
