# Preval test case

# number_obj_twice.md

> Normalize > Spread > Number obj twice
>
> Spread on number is an error

#TODO

## Input

`````js filename=intro
const x = 100;
const y = 200;
$({...x, ...y});
`````

## Pre Normal


`````js filename=intro
const x = 100;
const y = 200;
$({ ...x, ...y });
`````

## Normalized


`````js filename=intro
const x = 100;
const y = 200;
const tmpCallCallee = $;
const tmpCalleeParam = { ...x, ...y };
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = {};
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
