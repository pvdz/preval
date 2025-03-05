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

## Output


`````js filename=intro
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
