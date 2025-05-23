# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b.$(1) || b.$(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpIfTest /*:unknown*/ = $dotCall($, b, `\$`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCF$1 /*:unknown*/ = b.$;
  $dotCall(tmpMCF$1, b, `\$`, 1);
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
  $(a);
} else {
  b.$(1);
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
  $( c );
}
else {
  const d = a.$;
  $dotCall( d, a, "$", 1 );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCF = b.$;
const tmpIfTest = $dotCall(tmpMCF, b, `\$`, 1);
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCF$1 = b.$;
  $dotCall(tmpMCF$1, b, `\$`, 1);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
