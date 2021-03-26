# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Template > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = $($)($(1), $(2)))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($)($(1), $(2)))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const SSA_a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam = `before  ${SSA_a}  after`;
$(tmpCalleeParam);
$(SSA_a);
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
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
