# Preval test case

# same_objs.md

> Binary > Eq weak > Same objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
$(x == x);
`````

## Pre Normal


`````js filename=intro
const x = {};
$(x == x);
`````

## Normalized


`````js filename=intro
const x = {};
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
