# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > assignments > throw > auto_ident_call_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($)(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpCallCallee = $($);
const tmpNestedComplexRhs = tmpCallCallee(1);
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
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
