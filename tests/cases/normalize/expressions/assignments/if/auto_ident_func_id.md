# Preval test case

# auto_ident_func_id.md

> normalize > expressions > assignments > if > auto_ident_func_id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = function f() {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpNestedComplexRhs = function f() {};
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
tmpIfTest;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpNestedComplexRhs = function f() {};
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
