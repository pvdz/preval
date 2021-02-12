# Preval test case

# ident_simple.md

> normalize > assignment > for-a > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = b;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  let a_1 = b;
}
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  let a_1 = b;
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
