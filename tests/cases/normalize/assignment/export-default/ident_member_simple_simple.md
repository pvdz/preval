# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > export-default > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
export default a = b.x = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
export default ((b.x = c), (a = c));
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
export default ((b.x = 3), (a = 3));
$(a, b, 3);
`````
