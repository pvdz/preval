# Preval test case

# auto_ident_prop_simple.md

> normalize > expressions > assignments > throw > auto_ident_prop_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = b.c);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = b.c;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
