# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))["$"](1)) || (a = (1, 2, $(b))["$"](1)));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpCallObj.$(1);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpCallObj$1 /*:unknown*/ = $(b);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallObj$1.$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpClusterSSA_a = $(b).$(1);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpNestedComplexRhs = $(b).$(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[`\$`](1)) || (a = (1, 2, $(b))[`\$`](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
a = tmpCallObj.$(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCallObj$1 = $(b);
  const tmpNestedComplexRhs = tmpCallObj$1.$(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
if (c) {
  $( c );
  $( c );
}
else {
  const d = $( a );
  const e = d.$( 1 );
  $( e );
  $( e );
}
`````

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
