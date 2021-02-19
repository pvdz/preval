# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > statement > arr_element > auto_ident_new_complex_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new ($($))($(1), $(2)) + new ($($))($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpBinBothRhs = new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpBinBothRhs = new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
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
