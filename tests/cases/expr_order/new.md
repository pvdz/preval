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
var tmpArg;
var tmpArg_1;
let i = 0;
tmpArg = i;
i = i + 1;
tmpArg_1 = i;
new $(tmpArg, tmpArg_1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
let i = 0;
tmpArg = i;
i = i + 1;
tmpArg_1 = i;
new $(tmpArg, tmpArg_1);
`````
