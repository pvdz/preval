# Preval test case

# prefix_plus.md

> Normalize > Update > Prefix plus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(++x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
$(++x);
`````

## Normalized


`````js filename=intro
let x = 1;
const tmpCallCallee = $;
x = x + 1;
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
