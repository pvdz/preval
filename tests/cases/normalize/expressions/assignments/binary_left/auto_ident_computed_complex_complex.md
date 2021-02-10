# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > assignments > binary_left > auto_ident_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)[$("c")]) + $(100));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
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
 - 3: 100
 - 4: 101
 - 5: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
