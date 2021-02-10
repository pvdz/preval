# Preval test case

# postfix_plus.md

> normalize > update > postfix_plus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(x++);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpCallCallee = $;
const tmpPostUpdArgIdent = x;
x = x + 1;
const tmpCalleeParam = tmpPostUpdArgIdent;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
