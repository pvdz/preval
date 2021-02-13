# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > compound > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a *= delete $(arg)["y"]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
const tmpBinBothRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpDeleteCompObj = $(arg);
const tmpBinBothRhs = delete tmpDeleteCompObj['y'];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: NaN
 - 3: NaN, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same