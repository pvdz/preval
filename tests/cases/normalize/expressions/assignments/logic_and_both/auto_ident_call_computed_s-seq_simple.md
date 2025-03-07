# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)["$"](1)) && (a = (1, 2, b)["$"](1)));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
let a /*:unknown*/ = b.$(1);
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpNestedComplexRhs /*:unknown*/ = b.$(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
let a = b.$(1);
const tmpCalleeParam = a;
if (a) {
  const tmpNestedComplexRhs = b.$(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[`\$`](1)) && (a = (1, 2, b)[`\$`](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = b;
a = tmpCallObj.$(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallObj$1 = b;
  const tmpNestedComplexRhs = tmpCallObj$1.$(1);
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
let b = a.$( 1 );
const c = b;
if (b) {
  const d = a.$( 1 );
  b = d;
  $( d );
}
else {
  $( c );
}
$( b );
`````

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
