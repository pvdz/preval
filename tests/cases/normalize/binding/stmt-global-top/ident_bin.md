# Preval test case

# ident_bin.md

> normalize > assignment > stmt > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
let a = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let a = b + c;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 2 + 3;
$(a, 2, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
