# Preval test case

# empty.md

> Normalize > Array > Empty
>
> Make sure empty array works

## Input

`````js filename=intro
$([]);
`````

## Pre Normal

`````js filename=intro
$([]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
