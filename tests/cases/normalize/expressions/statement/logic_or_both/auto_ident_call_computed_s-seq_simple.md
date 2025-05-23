# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)["$"](1) || (1, 2, b)["$"](1);
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
const tmpMCOO = b;
const tmpMCF = tmpMCOO.$;
const tmpIfTest = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCOO$1 = b;
  const tmpMCF$1 = tmpMCOO$1.$;
  $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
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
