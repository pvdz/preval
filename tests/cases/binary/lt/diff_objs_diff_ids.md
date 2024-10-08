# Preval test case

# diff_objs_diff_ids.md

> Binary > Lt > Diff objs diff ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
const y = x;
$(x < y);
`````

## Pre Normal


`````js filename=intro
const x = {};
const y = x;
$(x < y);
`````

## Normalized


`````js filename=intro
const x = {};
const y = x;
const tmpCallCallee = $;
const tmpCalleeParam = x < y;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:object*/ = {};
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
