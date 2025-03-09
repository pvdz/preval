# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic ll simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 0 || $($(1))) && (a = 0 || $($(1))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
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
const a = $($(1));
if (a) {
  const tmpNestedComplexRhs = $($(1));
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 0 || $($(1))) && (a = 0 || $($(1))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = 0;
if (a) {
} else {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = 0;
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
