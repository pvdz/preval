# Preval test case

# auto_ident_new_complex.md

> normalize > expressions > assignments > throw > auto_ident_new_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = new ($($))(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNewCallee = $($);
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
