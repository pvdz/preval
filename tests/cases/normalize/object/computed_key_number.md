# Preval test case

# computed_key_number.md

> Normalize > Object > Computed key number
>
> Computed key that is a number value might as well not be computed

#TODO

## Input

`````js filename=intro
$({[100]: 10});
`````

## Pre Normal


`````js filename=intro
$({ [100]: 10 });
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { [100]: 10 };
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { [100]: 10 };
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { 100[ 10 ]: 10 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 100: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
