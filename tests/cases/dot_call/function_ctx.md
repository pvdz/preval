# Preval test case

# function_ctx.md

> Dot call > Function ctx
>
>

## Input

`````js filename=intro
const x = $dotCall(Function, {eliminate:'me'}, 'return "pass";');
$(x());
`````

## Pre Normal


`````js filename=intro
const x = $dotCall(Function, { eliminate: `me` }, `return "pass";`);
$(x());
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $dotCall;
const tmpCalleeParam = Function;
const tmpCalleeParam$1 = { eliminate: `me` };
const tmpCalleeParam$3 = `return "pass";`;
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = x();
tmpCallCallee$1(tmpCalleeParam$5);
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
