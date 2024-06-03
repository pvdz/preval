# Preval test case

# call_bool.md

> Normalize > Spread > Call bool
>
> Spreading a boolean results in an error

#TODO

## Input

`````js filename=intro
$(...true);
`````

## Pre Normal

`````js filename=intro
$(...true);
`````

## Normalized

`````js filename=intro
$(...true);
`````

## Output

`````js filename=intro
$(...true);
`````

## PST Output

With rename=true

`````js filename=intro
$( ... true );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
