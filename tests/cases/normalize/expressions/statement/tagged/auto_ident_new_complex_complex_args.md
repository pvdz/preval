# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > statement > tagged > auto_ident_new_complex_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${new ($($))($(1), $(2))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpNewCallee = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpCalleeParam$1 = new tmpNewCallee(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpNewCallee = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpCalleeParam$1 = new tmpNewCallee(tmpCalleeParam$2, tmpCalleeParam$3);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: ['before ', ' after'], {}
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same