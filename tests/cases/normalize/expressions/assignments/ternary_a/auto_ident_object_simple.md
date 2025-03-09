# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) ? $(100) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$({ x: 1, y: 2, z: 3 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
a = { x: 1, y: 2, z: 3 };
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = {
  x: 1,
  y: 2,
  z: 3,
};
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
