# Preval test case

# same_objs.md

> Binary > Neq strong > Same objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

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
const tmpCallCallee = $;
const tmpCalleeParam = x !== x;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = {};
const tmpCalleeParam = x !== x;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = a !== a;
$( b );
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
