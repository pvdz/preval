# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Throw > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw (a = b = $(2));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
throw (a = b = $(2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpNestedComplexRhs = $(2);
throw tmpNestedComplexRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
