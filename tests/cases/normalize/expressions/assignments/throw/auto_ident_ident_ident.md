# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > throw > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
throw (a = b = 2);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
let tmpNestedComplexRhs;
b = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
let tmpNestedComplexRhs;
b = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, b, 2);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
