# Preval test case

# auto_ident_tagged_trivial.md

> normalize > expressions > assignments > let > auto_ident_tagged_trivial
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = $`foo`;
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['foo'];
let a = tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['foo'];
let a = tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: ['foo']
 - 2: ['foo']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
