# Preval test case

# obj_date_neq_num.md

> Typed comparison > Obj date neq num
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = new Date();
const y = x !== false;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = new Date();
const y = x !== false;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const x = new Date();
const y = x !== false;
$(`out:`, y);
`````

## Output


`````js filename=intro
new Date();
$(`out:`, true);
`````

## PST Output

With rename=true

`````js filename=intro
new Date();
$( "out:", true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
