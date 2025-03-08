# Preval test case

# new.md

> Expr order > New
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let i = 0;
new $(i, ++i);
`````

## Settled


`````js filename=intro
new $(0, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(0, 1);
`````

## Pre Normal


`````js filename=intro
let i = 0;
new $(i, ++i);
`````

## Normalized


`````js filename=intro
let i = 0;
const tmpNewCallee = $;
const tmpCalleeParam = i;
const tmpPostUpdArgIdent = $coerce(i, `number`);
i = tmpPostUpdArgIdent + 1;
const tmpCalleeParam$1 = i;
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
new $( 0, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
