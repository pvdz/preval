# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > for-in-right > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let x in (a = b[$('x')] = c + d));
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
  let tmpForInLhsDecl;
  {
    tmpNestedAssignCompMemberObj = b;
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberRhs = c + d;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    const tmpForInRhs = a;
    for (tmpForInLhsDecl in tmpForInRhs) {
      let x = tmpForInLhsDecl;
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
let tmpForInLhsDecl;
tmpNestedAssignCompMemberObj = b;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 7;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
a = tmpNestedAssignCompMemberRhs;
const tmpForInRhs = a;
for (tmpForInLhsDecl in tmpForInRhs) {
}
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 7,{"x":2,"undefined":7},3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [7, { x: 2, undefined: 7 }, 7], null];

