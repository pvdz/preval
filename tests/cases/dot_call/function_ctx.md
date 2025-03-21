# Preval test case

# function_ctx.md

> Dot call > Function ctx
>
>

## Input

`````js filename=intro
const x = $dotCall(Function, {eliminate:'me'}, undefined, 'return "pass";');
$(x());
`````

## Settled


`````js filename=intro
$(`pass`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````

## Pre Normal


`````js filename=intro
const x = $dotCall(Function, { eliminate: `me` }, undefined, `return "pass";`);
$(x());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = Function;
const tmpCalleeParam$1 = { eliminate: `me` };
const x = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, `return "pass";`);
const tmpCalleeParam$3 = x();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
