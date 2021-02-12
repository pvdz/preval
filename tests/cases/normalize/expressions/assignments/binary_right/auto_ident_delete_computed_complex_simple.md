# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > binary_right > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = delete $(x)["y"]));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpDeleteCompObj = $(x);
a = delete tmpDeleteCompObj['y'];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 101
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
