# Preval test case

# auto_ident_object_empty.md

> normalize > expressions > assignments > throw > auto_ident_object_empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = {});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = {};
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = {};
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same
