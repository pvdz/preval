# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Let > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = b = $(2));
$(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let xyz = a;
$(xyz);
$(a, b);
`````

## Output

`````js filename=intro
const tmpNestedComplexRhs = $(2);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
