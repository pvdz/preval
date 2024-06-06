# Preval test case

# boolean_number_0.md

> Array > Static context > Boolean number 0
>
> Calling Boolean on arrays trigger spies

#TODO

## Input

`````js filename=intro
$(Boolean([0]));
`````

## Pre Normal


`````js filename=intro
$(Boolean([0]));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallCallee$1 = Boolean;
const tmpCalleeParam$1 = [0];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
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
