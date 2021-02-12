# Preval test case

# order.md

> assignment > order
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

#TODO

## Input

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
let i = 0;
const tmpCalleeParam = i;
i = i + 1;
let tmpCalleeParam$1 = i;
new $(tmpCalleeParam, tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 0, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
