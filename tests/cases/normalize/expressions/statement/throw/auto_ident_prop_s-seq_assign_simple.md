# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > throw > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw ((1, 2, b).c = 2);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpThrowArg = tmpNestedPropAssignRhs;
throw tmpThrowArg;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpThrowArg = 2;
throw tmpThrowArg;
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
