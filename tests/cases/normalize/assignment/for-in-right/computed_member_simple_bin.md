# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > for-in-right > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let x in (a[$('x')] = b + c));
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
  let tmpForInLhsDecl;
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    {
      tmpAssignComputedObj = tmpBindInitMemberObject;
      tmpAssignComputedProp = $('x');
      tmpAssignComputedRhs = tmpBindInitRhs;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
    const tmpForInRhs = tmpBindInitRhs;
    for (tmpForInLhsDecl in tmpForInRhs) {
      let x = tmpForInLhsDecl;
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
let tmpForInLhsDecl;
let tmpBindInitMemberObject = a;
tmpAssignComputedObj = tmpBindInitMemberObject;
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 5;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
for (tmpForInLhsDecl in 5) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
[['x'], [{ x: 10, undefined: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[['x'], [{ x: 10, undefined: 5 }, 5, 3], null];

