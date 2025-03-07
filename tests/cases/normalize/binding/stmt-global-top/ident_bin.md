# Preval test case

# ident_bin.md

> Normalize > Binding > Stmt-global-top > Ident bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
let a = b + c;
$(a, b, c);
`````

## Settled


`````js filename=intro
$(5, 2, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5, 2, 3);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = b + c;
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
let a = b + c;
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 5, 2, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
