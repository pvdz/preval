# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 0 || 2;
$(a);
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
let a = { a: 999, b: 1000 };
throw 0 || 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = 0;
if (tmpThrowArg) {
} else {
  tmpThrowArg = 2;
}
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
