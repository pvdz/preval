# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > let > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let wat = a = b.x = c;
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
b.x = c;
a = c;
let wat = a;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
b.x = 3;
a = 3;
let wat = a;
$(wat);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[3], [3, { x: 3 }, 3], null];

Normalized calls: Same

Final output calls: Same
