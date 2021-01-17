# Preval test case

# ident_bin.md

> normalize > assignment > label > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
boo: a = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  a = b + c;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
a = 5;
$(a, 5, 3);
`````
