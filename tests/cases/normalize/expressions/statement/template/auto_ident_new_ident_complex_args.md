# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > statement > template > auto_ident_new_ident_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${new $($(1), $(2))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpTemplateExpr = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpTemplateExpr = new $(tmpCalleeParam$1, tmpCalleeParam$2);
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 'before  [object Object]  after'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same