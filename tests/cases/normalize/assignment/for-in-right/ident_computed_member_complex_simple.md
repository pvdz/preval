# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > for-in-right > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let x in (a = $(b)[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let tmpForInLhsDecl;
  {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
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
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let tmpForInLhsDecl;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
const tmpForInRhs = a;
for (tmpForInLhsDecl in tmpForInRhs) {
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: "x"
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
