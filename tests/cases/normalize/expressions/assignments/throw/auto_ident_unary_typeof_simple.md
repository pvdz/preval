# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > assignments > throw > auto_ident_unary_typeof_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw (a = typeof x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ number ]>')

Normalized calls: Same

Final output calls: Same
