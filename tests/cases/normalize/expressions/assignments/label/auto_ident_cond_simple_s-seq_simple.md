# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Label > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Settled


`````js filename=intro
$(60);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(60);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 60 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
