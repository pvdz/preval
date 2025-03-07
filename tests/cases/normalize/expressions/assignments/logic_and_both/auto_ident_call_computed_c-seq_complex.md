# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("$")](1)) && (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
let tmpClusterSSA_a /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
const tmpCalleeParam /*:unknown*/ = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpCallCompObj$1 /*:unknown*/ = $(b);
  const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallCompObj$1[tmpCallCompProp$1](1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
let tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$(`\$`)](1)) && (a = (1, 2, $(b))[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
let d = b[ c ]( 1 );
const e = d;
if (d) {
  const f = $( a );
  const g = $( "$" );
  const h = f[ g ]( 1 );
  d = h;
  $( h );
}
else {
  $( e );
}
$( d );
`````

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
