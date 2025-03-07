# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)));
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
$(a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
$(a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let xyz = a;
$(xyz);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
