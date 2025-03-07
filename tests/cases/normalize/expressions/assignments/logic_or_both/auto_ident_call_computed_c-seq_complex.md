# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("$")](1)) || (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
let tmpClusterSSA_a /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpCallCompObj$1 /*:unknown*/ = $(b);
  const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallCompObj$1[tmpCallCompProp$1](1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$(`\$`)](1)) || (a = (1, 2, $(b))[$(`\$`)](1)));
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
} else {
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
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
if (d) {
  $( d );
}
else {
  const e = $( a );
  const f = $( "$" );
  const g = e[ f ]( 1 );
  d = g;
  $( g );
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
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
