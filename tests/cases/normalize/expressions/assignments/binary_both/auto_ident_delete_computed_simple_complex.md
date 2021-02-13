# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > binary_both > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg[$("y")]) + (a = delete arg[$("y")]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpBinBothLhs = a;
const tmpDeleteCompObj$1 = arg;
const tmpDeleteCompProp$1 = $('y');
a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpBinBothLhs = a;
const tmpDeleteCompObj$1 = arg;
const tmpDeleteCompProp$1 = $('y');
a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: 2
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
