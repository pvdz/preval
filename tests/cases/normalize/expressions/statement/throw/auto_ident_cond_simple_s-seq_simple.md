# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond simple s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Settled


`````js filename=intro
throw 60;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 60;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
tmpThrowArg = 60;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
throw 60;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
