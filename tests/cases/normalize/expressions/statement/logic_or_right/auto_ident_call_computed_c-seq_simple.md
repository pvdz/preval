# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or right > Auto ident call computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) || (1, 2, $(b))["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const b /*:object*/ = { $: $ };
  const tmpMCOO /*:unknown*/ = $(b);
  const tmpMCF /*:unknown*/ = tmpMCOO.$;
  $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCOO = $({ $: $ });
  tmpMCOO.$(1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = { $: $ };
  const d = $( c );
  const e = d.$;
  $dotCall( e, d, "$", 1 );
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
