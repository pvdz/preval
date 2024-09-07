# Preval test case

# string_replace.md

> Pst > String replace
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $();
const y = $();
"".replace(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $();
const y = $();
``.replace(x, y);
`````

## Normalized


`````js filename=intro
const x = $();
const y = $();
``.replace(x, y);
`````

## Output


`````js filename=intro
const x = $();
const y = $();
``.replace(x, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = $();
c.replace( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
