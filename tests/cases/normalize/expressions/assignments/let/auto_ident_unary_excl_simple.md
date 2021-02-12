# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > assignments > let > auto_ident_unary_excl_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = !x);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz;
const tmpNestedComplexRhs = !x;
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz;
const tmpNestedComplexRhs = !x;
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: false
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
