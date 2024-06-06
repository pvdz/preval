# Preval test case

# constructor.md

> Normalize > Number > Constructor
>
> The .constructor property should resolve to Number

#TODO

## Input

`````js filename=intro
$(500..constructor("300"));
`````

## Pre Normal


`````js filename=intro
$((500).constructor(`300`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $coerce(`300`, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(300);
`````

## PST Output

With rename=true

`````js filename=intro
$( 300 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 300
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
