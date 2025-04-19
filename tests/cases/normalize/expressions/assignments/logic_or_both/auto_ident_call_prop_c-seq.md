# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).$(1)) || (a = (1, 2, $(b)).$(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpMCOO$1 /*:unknown*/ = $(b);
  const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCOO = $(b);
const tmpClusterSSA_a = tmpMCOO.$(1);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpMCOO$1 = $(b);
  const tmpNestedComplexRhs = tmpMCOO$1.$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
if (d) {
  $( d );
  $( d );
}
else {
  const e = $( a );
  const f = e.$;
  const g = $dotCall( f, e, "$", 1 );
  $( g );
  $( g );
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
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
