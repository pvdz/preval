# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1)) && (a = $(1)));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpNestedComplexRhs /*:unknown*/ = $(1);
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
let a = $(1);
const tmpCalleeParam = a;
if (a) {
  const tmpNestedComplexRhs = $(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1)) && (a = $(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = $(1);
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
let a = $( 1 );
const b = a;
if (a) {
  const c = $( 1 );
  a = c;
  $( c );
}
else {
  $( b );
}
$( a );
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
