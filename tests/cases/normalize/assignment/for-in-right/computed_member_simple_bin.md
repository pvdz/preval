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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpBindInitMemberObject = a;
  let tmpBindInitRhs = b + c;
  tmpAssignComMemLhsObj = tmpBindInitMemberObject;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpBindInitRhs;
  const tmpForInDeclRhs = tmpBindInitRhs;
  let tmpForInDeclLhs;
  let x;
  for (tmpForInDeclLhs in tmpForInDeclRhs) {
    x = tmpForInDeclLhs;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let tmpBindInitMemberObject = a;
tmpAssignComMemLhsObj = tmpBindInitMemberObject;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 5;
let tmpForInDeclLhs;
let x;
for (tmpForInDeclLhs in 5) {
  x = tmpForInDeclLhs;
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [{ x: 5 }, 5, 3], null];

