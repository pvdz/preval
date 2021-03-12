# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Arr element > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) + (a = $($)($(1), $(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) + (a = $($)($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
let tmpBinBothLhs = a;
const tmpCallCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$4 = $(2);
a = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$4);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const SSA_a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
const tmpCallCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$4 = $(2);
const SSA_a$1 = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$4);
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
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
 - 9: 2
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
