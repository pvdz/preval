# Preval test case

# postfix_plus.md

> Normalize > Update > Postfix plus
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = 1;
$(x++);
`````

## Pre Normal


`````js filename=intro
let x = 1;
$(x++);
`````

## Normalized


`````js filename=intro
let x = 1;
const tmpPostUpdArgIdent = x;
x = x + 1;
const tmpCalleeParam = tmpPostUpdArgIdent;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
