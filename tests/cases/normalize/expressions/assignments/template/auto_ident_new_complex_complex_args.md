# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > assignments > template > auto_ident_new_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = new ($($))($(1), $(2)))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 'before  [object Object]  after'
 - 6: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
