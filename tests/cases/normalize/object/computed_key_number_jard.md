# Preval test case

# computed_key_number_jard.md

> Normalize > Object > Computed key number jard
>
> Computed key that is a number value might as well not be computed but has to be converted properly

## Input

`````js filename=intro
$({[1e4]: 10}); // This will create a key 1000, not '1e4'. Luckily this shouldn't matter for the AST but dangerous if keys get normalized to strings.
`````

## Pre Normal


`````js filename=intro
$({ [10000]: 10 });
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { [10000]: 10 };
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [10000]: 10 };
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ 10000 ]: 10 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 10000: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
