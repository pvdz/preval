# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b))["$"](1) && (1, 2, $(b))["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpIfTest /*:unknown*/ = tmpCallObj.$(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallObj$1 /*:unknown*/ = $(b);
  tmpCallObj$1.$(1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpIfTest = $(b).$(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(b).$(1);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = $( a );
  e.$( 1 );
  $( d );
}
else {
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
