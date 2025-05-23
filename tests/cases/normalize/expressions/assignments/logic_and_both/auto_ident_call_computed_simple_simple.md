# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = b["$"](1)) && (a = b["$"](1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = $dotCall($, b, `\$`, 1);
if (a) {
  const tmpMCF$1 /*:unknown*/ = b.$;
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, b, `\$`, 1);
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
const a = $dotCall($, b, `\$`, 1);
if (a) {
  const tmpNestedComplexRhs = b.$(1);
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
const b = $dotCall( $, a, "$", 1 );
if (b) {
  const c = a.$;
  const d = $dotCall( c, a, "$", 1 );
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCF = b.$;
a = $dotCall(tmpMCF, b, `\$`, 1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpMCF$1 = b.$;
  const tmpNestedComplexRhs = $dotCall(tmpMCF$1, b, `\$`, 1);
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
