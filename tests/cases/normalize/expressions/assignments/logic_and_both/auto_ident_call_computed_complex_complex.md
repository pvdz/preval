# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)[$("$")](1)) && (a = $(b)[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
if (tmpClusterSSA_a) {
  const tmpMCCO$1 /*:unknown*/ = $(b);
  const tmpMCCP$1 /*:unknown*/ = $(`\$`);
  const tmpMCF$1 /*:unknown*/ = tmpMCCO$1[tmpMCCP$1];
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
const tmpClusterSSA_a = tmpMCCO[tmpMCCP](1);
if (tmpClusterSSA_a) {
  const tmpMCCO$1 = $(b);
  const tmpMCCP$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpMCCO$1[tmpMCCP$1](1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = $dotCall( d, b, undefined, 1 );
if (e) {
  const f = $( a );
  const g = $( "$" );
  const h = f[ g ];
  const i = $dotCall( h, f, undefined, 1 );
  $( i );
  $( i );
}
else {
  $( e );
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: '$'
 - 6: 1
 - 7: 1
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
