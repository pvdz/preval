# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) && $(100));
$(a);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const a /*:array*/ = [1, 2, 3];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) && $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = [ 1, 2, 3 ];
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
