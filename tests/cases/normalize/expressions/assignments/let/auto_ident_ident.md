# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Let > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = b);
$(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = b;
let xyz = a;
$(xyz);
$(a, b);
`````

## Output

`````js filename=intro
$(1);
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
