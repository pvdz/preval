# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) || (a = []));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = [];
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:array*/ = [];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = [];
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs = [];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) || (a = []));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = [];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = [];
if (a) {
  $( a );
}
else {
  const b = [];
  a = b;
  $( b );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
