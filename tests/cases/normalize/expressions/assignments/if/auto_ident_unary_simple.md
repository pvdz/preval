# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > If > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
if ((a = typeof x));
$(a, x);
`````

## Settled


`````js filename=intro
$(`number`, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
if ((a = typeof x));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpIfTest = a;
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "number", 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
