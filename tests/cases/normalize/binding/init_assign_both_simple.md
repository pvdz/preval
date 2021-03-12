# Preval test case

# init_assign_both_simple.md

> Normalize > Binding > Init assign both simple
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b = c
`````

## Pre Normal

`````js filename=intro
let b = 10;
let c = 20;
let a = (b = c);
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
b = c;
let a = b;
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
