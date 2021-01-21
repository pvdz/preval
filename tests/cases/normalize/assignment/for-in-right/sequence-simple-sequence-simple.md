# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-in-right > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (let x in ((a, b).c = (a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpForInLhsDecl;
  {
    a;
    let tmpBindInitMemberObject = b;
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
let tmpBindInitMemberObject = b;
b.c = 3;
tmpBindInitMemberObject.c = 3;
for (tmpForInLhsDecl in 3) {
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same