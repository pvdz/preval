# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > statement > binary_both > auto_ident_call_ident_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1), $(2)) + $($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
