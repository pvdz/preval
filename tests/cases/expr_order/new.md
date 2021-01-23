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
var tmpNestedComplexRhs;
var tmpArg;
var tmpArg$1;
let i = 0;
tmpArg = i;
tmpNestedComplexRhs = i + 1;
i = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
new $(tmpArg, tmpArg$1);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpArg$1;
let i = 0;
tmpArg = i;
tmpNestedComplexRhs = i + 1;
i = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
new $(tmpArg, tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 0,1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
