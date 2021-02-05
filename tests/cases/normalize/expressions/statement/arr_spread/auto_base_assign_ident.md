# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > statement > arr_spread > auto_base_assign_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
[...(b = $(2))];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpArrElToSpread;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
tmpArrElToSpread = tmpNestedComplexRhs;
[...tmpArrElToSpread];
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpArrElToSpread;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
tmpArrElToSpread = tmpNestedComplexRhs;
[...tmpArrElToSpread];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
