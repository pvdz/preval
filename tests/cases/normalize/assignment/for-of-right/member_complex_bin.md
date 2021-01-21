# Preval test case

# member_complex_bin.md

> normalize > assignment > for-of-right > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let x of ($(a).x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForOfLhsDecl;
  {
    let tmpBindInitMemberObject = $(a);
    let tmpBindInitRhs = b + c;
    tmpBindInitMemberObject.x = tmpBindInitRhs;
    const tmpForOfRhs = tmpBindInitRhs;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
let tmpForOfLhsDecl;
let tmpBindInitMemberObject = $(a);
tmpBindInitMemberObject.x = 5;
for (tmpForOfLhsDecl of 5) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
