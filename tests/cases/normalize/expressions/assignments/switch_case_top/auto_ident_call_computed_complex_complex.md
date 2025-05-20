# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $(b)[$("$")](1);
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpMCCO /*:unknown*/ = $(b);
  const tmpMCCP /*:unknown*/ = $(`\$`);
  const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
  const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpMCCO = $({ $: $ });
  const tmpMCCP = $(`\$`);
  $(tmpMCCO[tmpMCCP](1));
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = { $: $ };
  const e = $( d );
  const f = $( "$" );
  const g = e[ f ];
  const h = $dotCall( g, e, undefined, 1 );
  $( h );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  $( i );
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
 - 3: { $: '"<$>"' }
 - 4: '$'
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
