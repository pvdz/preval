# Preval test case

# ident_ident_bin.md

> normalize > assignment > export-default > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
export default a = b = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
export default ((tmpNestedComplexRhs = c + d), (b = tmpNestedComplexRhs), (a = tmpNestedComplexRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
export default ((tmpNestedComplexRhs = 7), (b = tmpNestedComplexRhs), (a = tmpNestedComplexRhs));
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same