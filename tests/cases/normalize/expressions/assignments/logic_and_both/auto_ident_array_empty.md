# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) && (a = []));
$(a);
`````

## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:array*/ = [];
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = [];
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) && (a = []));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = [];
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
const a = [];
$( a );
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
