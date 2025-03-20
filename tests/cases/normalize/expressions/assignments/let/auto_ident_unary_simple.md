# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = typeof x);
$(xyz);
$(a, x);
`````


## Settled


`````js filename=intro
$(`number`);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( "number", 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
