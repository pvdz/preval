# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > throw > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
throw (a = delete ($(1), $(2), $(x)).y);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
$(1);
$(2);
const tmpDeleteObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
$(1);
$(2);
const tmpDeleteObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: Same
