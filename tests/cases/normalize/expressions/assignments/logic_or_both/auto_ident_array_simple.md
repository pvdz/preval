# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) || (a = [1, 2, 3]));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = [1, 2, 3];
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:array*/ = [1, 2, 3];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = [1, 2, 3];
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs = [1, 2, 3];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) || (a = [1, 2, 3]));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = [1, 2, 3];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = [ 1, 2, 3 ];
if (a) {
  $( a );
}
else {
  const b = [ 1, 2, 3 ];
  a = b;
  $( b );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
