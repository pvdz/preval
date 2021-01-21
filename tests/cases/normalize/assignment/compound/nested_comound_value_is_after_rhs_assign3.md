# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

Test case to demonstrate that `a = b += c` assigns `b+c` to `a`, not just `c`.

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a += b = 500
$(a, b);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
b = 500;
a = a + 500;
$(a, b);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
b = 500;
a = a + 500;
$(a, b);
`````

## Result

Should call `$` with:
 - 0: 501,500
 - 1: undefined

Normalized calls: Same

Final output calls: Same
