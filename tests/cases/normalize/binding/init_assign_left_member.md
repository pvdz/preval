# Preval test case

# init_assign.md

> normalize > binding > init_assign
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b = c.x
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
let a;
const tmpNestedComplexRhs = c.x;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
`````

## Output

`````js filename=intro
let b = 10;
let c = 20;
let a;
const tmpNestedComplexRhs = c.x;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
