# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) && (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
let a /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  $(1);
  $(2);
  const tmpNestedComplexRhs /*:unknown*/ = $(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
let a = $(1);
const tmpCalleeParam = a;
if (a) {
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) && (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(x);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
let a = $( 1 );
const b = a;
if (a) {
  $( 1 );
  $( 2 );
  const c = $( 1 );
  a = c;
  $( c );
}
else {
  $( b );
}
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 1
 - 8: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
