# Preval test case

# postfix_minus.md

> normalize > update > postfix_minus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(x--);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpCallCallee = $;
const tmpPostUpdArgIdent = x;
x = x - 1;
const tmpCalleeParam = tmpPostUpdArgIdent;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let x = 1;
const tmpPostUpdArgIdent = x;
x = x - 1;
$(tmpPostUpdArgIdent);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
