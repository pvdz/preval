# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-a > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let a = b = c + d;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
b = c + d;
let a_1 = b;
`````

## Output

`````js filename=intro
let b = 2;
b = 7;
const a_1 = b;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
