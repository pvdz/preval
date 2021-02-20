# Preval test case

# auto_ident_tagged_simple.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident tagged simple
>
> Normalization of assignments should work the same everywhere they are

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
const a = $(tmpCalleeParam, 1);
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
