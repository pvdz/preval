# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > throw > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
throw (a = delete x["y"]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNestedComplexRhs = delete x['y'];
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
