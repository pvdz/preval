# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new $(1)) || (a = new $(1)));
$(a);
`````

## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
$(a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
$(a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new $(1)) || (a = new $(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpNestedComplexRhs = new $(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
