# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > assignments > throw > auto_ident_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = (1, 2, $(b))[$("c")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
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
 - 1: { c: '1' }
 - 2: 'c'
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
