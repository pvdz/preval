# Preval test case

# prefix_plus.md

> normalize > update > prefix_plus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(++x);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = x;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
x = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
