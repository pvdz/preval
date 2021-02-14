# Preval test case

# prefix_plus.md

> normalize > update > prefix_plus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(++x);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpCallCallee = $;
x = x + 1;
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let x = 1;
x = x + 1;
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
