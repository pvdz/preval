# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) || $(100));
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$($(100));
$(undefined);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) || $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 100 );
$( a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
