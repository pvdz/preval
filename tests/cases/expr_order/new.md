# Preval test case

# new.md

> Expr order > New
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

## Input

`````js filename=intro
let i = 0;
new $(i, ++i);
`````

## Pre Normal

`````js filename=intro
let i = 0;
new $(i, ++i);
`````

## Normalized

`````js filename=intro
let i = 0;
const tmpNewCallee = $;
const tmpCalleeParam = i;
i = i + 1;
let tmpCalleeParam$1 = i;
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
new $(0, 1);
`````

## PST Output

With rename=true

`````js filename=intro
new $( 0, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
