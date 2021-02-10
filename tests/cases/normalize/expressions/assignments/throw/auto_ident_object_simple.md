# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > assignments > throw > auto_ident_object_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = { x: 1, y: 2, z: 3 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
