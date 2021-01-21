# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > for-in-right > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (let x in ((a, $(b)).c = (a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  let tmpForInLhsDecl;
  {
    a;
    let tmpBindInitMemberObject = $(b);
    {
      a;
      b.c = d;
    }
    let tmpBindInitRhs = d;
    tmpBindInitMemberObject.c = tmpBindInitRhs;
    const tmpForInRhs = tmpBindInitRhs;
    for (tmpForInLhsDecl in tmpForInRhs) {
      let x = tmpForInLhsDecl;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
let tmpForInLhsDecl;
let tmpBindInitMemberObject = $(b);
b.c = 3;
tmpBindInitMemberObject.c = 3;
for (tmpForInLhsDecl in 3) {
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
