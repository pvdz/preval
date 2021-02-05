# Preval test case

# ident_simple.md

> normalize > assignment > stmt > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
let a = b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let a = b;
$(a, b, c);
`````

## Output

`````js filename=intro
$(2, 2, 3);
`````

## Result

Should call `$` with:
 - 1: 2, 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
