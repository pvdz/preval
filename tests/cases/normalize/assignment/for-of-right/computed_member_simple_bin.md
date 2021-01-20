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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForOfLhsDecl;
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    {
      tmpAssignComputedObj = tmpBindInitMemberObject;
      tmpAssignComputedProp = $('x');
      tmpAssignComputedRhs = tmpBindInitRhs;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let tmpForOfLhsDecl;
let tmpBindInitMemberObject = a;
tmpAssignComputedObj = tmpBindInitMemberObject;
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 5;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
for (tmpForOfLhsDecl of 5) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
[['x'], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
