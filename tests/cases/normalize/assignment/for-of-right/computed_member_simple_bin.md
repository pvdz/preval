# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > for-of-right > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let x of (a[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForOfLhsDecl;
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    tmpAssignComMemLhsObj = tmpBindInitMemberObject;
    tmpAssignComMemLhsProp = $('x');
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpBindInitRhs;
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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let tmpForOfLhsDecl;
let tmpBindInitMemberObject = a;
tmpAssignComMemLhsObj = tmpBindInitMemberObject;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 5;
for (tmpForOfLhsDecl of 5) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
