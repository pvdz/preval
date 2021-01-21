# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > for-of-right > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let x of (a = $(b)[$('x')] = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  let tmpForOfLhsDecl;
  {
    tmpNestedAssignCompMemberObj = $(b);
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberRhs = c + d;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    const tmpForOfRhs = a;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let tmpForOfLhsDecl;
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 7;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
a = tmpNestedAssignCompMemberRhs;
const tmpForOfRhs = a;
for (tmpForOfLhsDecl of tmpForOfRhs) {
}
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: "x"
 - 2: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
