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
let a = b = c
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
let b = 10;
b = 20;
let a = b;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
