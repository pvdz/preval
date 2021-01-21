# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > for-of-right > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (let x of ((a, $(b)).c = (a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpForOfLhsDecl;
  {
    a;
    let tmpBindInitMemberObject = $(b);
    {
      a;
      b.c = d;
    }
    let tmpBindInitRhs = d;
    tmpBindInitMemberObject.c = tmpBindInitRhs;
    const tmpForOfRhs = tmpBindInitRhs;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
let tmpForOfLhsDecl;
let tmpBindInitMemberObject = $(b);
b.c = 3;
tmpBindInitMemberObject.c = 3;
for (tmpForOfLhsDecl of 3) {
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same