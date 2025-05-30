# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b).$(1) && (1, 2, b).$(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpIfTest /*:unknown*/ = $dotCall($, b, `\$`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpMCF$1 /*:unknown*/ = b.$;
  $dotCall(tmpMCF$1, b, `\$`, 1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpIfTest = $dotCall($, b, `\$`, 1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  b.$(1);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = a.$;
  $dotCall( d, a, "$", 1 );
  $( c );
}
else {
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
