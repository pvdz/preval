# Preval test case

# same_objs.md

> Binary > Lt > Same objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
$(x < x);
`````

## Pre Normal


`````js filename=intro
const x = {};
$(x < x);
`````

## Normalized


`````js filename=intro
const x = {};
const tmpCallCallee = $;
x < x;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = {};
x ** 0;
x ** 0;
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
a ** 0;
a ** 0;
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
