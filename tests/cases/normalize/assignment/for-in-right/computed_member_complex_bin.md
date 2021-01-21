# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > for-in-right > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let x in ($(a)[$('x')] = b + c));
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
  let tmpForInLhsDecl;
  {
    let tmpBindInitMemberObject = $(a);
    let tmpBindInitRhs = b + c;
    tmpAssignComMemLhsObj = tmpBindInitMemberObject;
    tmpAssignComMemLhsProp = $('x');
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpBindInitRhs;
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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let tmpForInLhsDecl;
let tmpBindInitMemberObject = $(a);
tmpAssignComMemLhsObj = tmpBindInitMemberObject;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 5;
for (tmpForInLhsDecl in 5) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], ['x'], [{ x: 5 }, 5, 3], null];

