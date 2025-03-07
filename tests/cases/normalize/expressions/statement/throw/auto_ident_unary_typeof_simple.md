# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw typeof arg;
$(a, arg);
`````

## Settled


`````js filename=intro
throw `number`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `number`;
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
throw typeof arg;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = typeof arg;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
throw "number";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ number ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
