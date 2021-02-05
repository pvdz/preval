# Preval test case

# auto_ident_arrow.md

> normalize > expressions > assignments > let > auto_ident_arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = () => {});
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
const tmpNestedComplexRhs = () => {};
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
const tmpNestedComplexRhs = () => {};
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
