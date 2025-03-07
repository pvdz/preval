# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw ++b;
$(a, b);
`````

## Settled


`````js filename=intro
throw 2;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 2;
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
throw ++b;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b + 1;
let tmpThrowArg = b;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
throw 2;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
