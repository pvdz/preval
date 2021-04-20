# Preval test case

# prefix_plus_unknown.md

> Normalize > Update > Prefix plus unknown
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = $(1);
$(++x);
`````

## Pre Normal

`````js filename=intro
let x = $(1);
$(++x);
`````

## Normalized

`````js filename=intro
let x = $(1);
const tmpCallCallee = $;
x = x + 1;
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = $(1);
const tmpSSA_x = x + 1;
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
