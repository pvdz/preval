# Preval test case

# init_assign.md

> normalize > binding > init_assign
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b.x = c
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
b.x = c;
let a = c;
`````

## Output

`````js filename=intro
(10).x = 20;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
