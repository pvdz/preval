# Preval test case

# same_objs.md

> Binary > Neq strong > Same objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
$(x !== x);
`````

## Pre Normal


`````js filename=intro
const x = {};
$(x !== x);
`````

## Normalized


`````js filename=intro
const x = {};
const tmpCalleeParam = false;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
