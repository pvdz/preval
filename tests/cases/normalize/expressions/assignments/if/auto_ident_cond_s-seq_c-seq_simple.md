# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > If > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(60));
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let tmpIfTest = a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
