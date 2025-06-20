# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)["$"](1)) && (a = $(b)["$"](1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
if (a) {
  const tmpMCOO$1 /*:unknown*/ = $(b);
  const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCOO = $(b);
const a = tmpMCOO.$(1);
if (a) {
  const tmpMCOO$1 = $(b);
  const tmpNestedComplexRhs = tmpMCOO$1.$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
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
if (d) {
  const e = $( a );
  const f = e.$;
  const g = $dotCall( f, e, "$", 1 );
  $( g );
  $( g );
}
else {
  $( d );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCOO = $(b);
const tmpMCF = tmpMCOO.$;
a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpMCOO$1 = $(b);
  const tmpMCF$1 = tmpMCOO$1.$;
  const tmpNestedComplexRhs = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
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
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
