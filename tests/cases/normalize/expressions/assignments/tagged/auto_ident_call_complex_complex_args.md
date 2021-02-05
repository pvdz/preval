# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > assignments > tagged > auto_ident_call_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = $($)($(1), $(2)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: ['before ', ' after'], 1
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
