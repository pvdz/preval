# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > stmt > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = $(b).x = $(c).y = $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
let a = $(b).x = $(c).y = $(d);
$(a, b, c, d);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
let a = $(b).x = $(3).y = $(4);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: 4,{"x":4},3,4
 - 4: undefined

Normalized calls: Same

Final output calls: Same
