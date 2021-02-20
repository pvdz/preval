# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Arr element > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($)($(1), $(2)) + $($)($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
