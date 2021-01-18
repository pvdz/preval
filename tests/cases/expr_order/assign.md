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
let j = i + ++i;
$(j);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
let i = 0;
tmpBinaryLeft = i;
tmpNestedComplexRhs = i + 1;
i = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
let j = tmpBinaryLeft + tmpBinaryRight;
$(j);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
let i = 0;
tmpBinaryLeft = i;
tmpNestedComplexRhs = i + 1;
i = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
let j = tmpBinaryLeft + tmpBinaryRight;
$(j);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
