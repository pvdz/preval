# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > let > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
let wat = (a, $(b)).c = (a, b).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let d = 3;
a;
let tmpBindInitMemberObject = $(b);
{
  a;
  b.c = d;
}
let tmpBindInitRhs = d;
tmpBindInitMemberObject.c = tmpBindInitRhs;
let wat = tmpBindInitRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
let tmpBindInitMemberObject = $(b);
b.c = 3;
tmpBindInitMemberObject.c = 3;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
