# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b))["$"](1) || (1, 2, $(b))["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpIfTest /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCOO$1 /*:unknown*/ = $(b);
  const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
  $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCOO = $(b);
const tmpIfTest = tmpMCOO.$(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCOO$1 = $(b);
  tmpMCOO$1.$(1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( e );
}
else {
  const f = $( a );
  const g = f.$;
  $dotCall( g, f, "$", 1 );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCOO = $(b);
const tmpMCF = tmpMCOO.$;
const tmpIfTest = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCOO$1 = $(b);
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
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
