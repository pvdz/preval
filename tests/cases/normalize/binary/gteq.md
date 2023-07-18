# Preval test case

# gteq.md

> Normalize > Binary > Gteq
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 >= 3);
`````

## Pre Normal

`````js filename=intro
$(5 >= 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
