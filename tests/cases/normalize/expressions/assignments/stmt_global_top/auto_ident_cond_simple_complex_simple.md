# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident cond simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1 ? $(2) : $($(100));
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1 ? $(2) : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(2);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
