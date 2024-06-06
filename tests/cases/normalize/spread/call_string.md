# Preval test case

# call_string.md

> Normalize > Spread > Call string
>
> Spreading a string results in individual characters

#TODO

## Input

`````js filename=intro
$(..."foo");
`````

## Pre Normal


`````js filename=intro
$(...`foo`);
`````

## Normalized


`````js filename=intro
$(...`foo`);
`````

## Output


`````js filename=intro
$(...`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( ... "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'f', 'o', 'o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
