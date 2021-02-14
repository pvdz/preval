# Preval test case

# auto_ident_tagged_simple.md

> normalize > expressions > statement > return > auto_ident_tagged_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = $`fo${1}o`;
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['fo', 'o'];
const tmpCalleeParam$1 = 1;
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['fo', 'o'];
let a = $(tmpCalleeParam, 1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['fo', 'o'], 1
 - 2: ['fo', 'o']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
