# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > statement > arr_element > auto_ident_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(b)[$("c")] + $(b)[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpBinBothLhs = tmpCompObj[tmpCompProp];
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('c');
const tmpBinBothRhs = tmpCompObj$1[tmpCompProp$1];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpBinBothLhs = tmpCompObj[tmpCompProp];
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('c');
const tmpBinBothRhs = tmpCompObj$1[tmpCompProp$1];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: { c: '1' }
 - 4: 'c'
 - 5: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
