# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Logic or both > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b = $(2)) || (a = b = $(2)));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
let b /*:unknown*/ = tmpNestedComplexRhs;
let a /*:unknown*/ = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(tmpNestedComplexRhs);
} else {
  b = $(2);
  a = b;
  $(b);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
let b = tmpNestedComplexRhs;
let a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(tmpNestedComplexRhs);
} else {
  b = $(2);
  a = b;
  $(b);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b = $(2)) || (a = b = $(2)));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  b = $(2);
  let tmpNestedComplexRhs$1 = b;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
let b = a;
let c = a;
if (a) {
  $( a );
}
else {
  b = $( 2 );
  c = b;
  $( b );
}
$( c, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
