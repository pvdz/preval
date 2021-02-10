# Preval test case

# auto_ident_tagged_complex.md

> normalize > expressions > assignments > ternary_a > auto_ident_tagged_complex
>
> Normalization of assignments should work the same everywhere they are

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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: ['foo', ''], 1
 - 3: ['foo', '']
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
