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
const b /*:object*/ = { $: $ };
let a /*:unknown*/ = b.$(1);
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:unknown*/ = b.$(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
let a = b.$(1);
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs = b.$(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b).$(1)) || (a = (1, 2, b).$(1)));
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
} else {
  const tmpCallObj$1 = b;
  const tmpNestedComplexRhs = tmpCallObj$1.$(1);
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
let b = a.$( 1 );
if (b) {
  $( b );
}
else {
  const c = a.$( 1 );
  b = c;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
