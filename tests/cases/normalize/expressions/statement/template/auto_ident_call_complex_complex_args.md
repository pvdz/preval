# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Template > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${$($)($(1), $(2))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(`before  ` + $($)($(1), $(2)) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpBinLhs = `before  ` + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
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
 - 5: 'before 1 after'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
