# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).$(1)) || (a = (1, 2, b).$(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const a /*:unknown*/ = $dotCall($, b, `\$`, 1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpMCF$1 /*:unknown*/ = b.$;
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, b, `\$`, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const a = $dotCall($, b, `\$`, 1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs = b.$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
if (b) {
  $( b );
  $( b );
}
else {
  const c = a.$;
  const d = $dotCall( c, a, "$", 1 );
  $( d );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCOO = b;
const tmpMCF = tmpMCOO.$;
a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpMCOO$1 = b;
  const tmpMCF$1 = tmpMCOO$1.$;
  const tmpNestedComplexRhs = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
