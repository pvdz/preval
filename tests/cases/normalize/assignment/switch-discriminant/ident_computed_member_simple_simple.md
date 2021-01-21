# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > switch-discriminant > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch (a = b[$('x')] = c) {}
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
  a = c;
  const tmpSwitchTest = a;
  {
    let tmpFallthrough = false;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
a = 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3,{"x":2,"undefined":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
