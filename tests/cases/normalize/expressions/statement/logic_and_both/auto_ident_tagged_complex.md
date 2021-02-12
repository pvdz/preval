# Preval test case

# auto_ident_tagged_complex.md

> normalize > expressions > statement > logic_and_both > auto_ident_tagged_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = $`foo${$(1)}`;
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['foo', ''];
const tmpCalleeParam$1 = $(1);
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['foo', ''];
const tmpCalleeParam$1 = $(1);
let a = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: ['foo', ''], 1
 - 3: ['foo', '']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
