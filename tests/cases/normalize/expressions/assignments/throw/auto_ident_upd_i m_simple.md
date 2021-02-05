# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > throw > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw (a = b--);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpNestedComplexRhs = tmpPostUpdArgIdent;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpNestedComplexRhs = tmpPostUpdArgIdent;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
