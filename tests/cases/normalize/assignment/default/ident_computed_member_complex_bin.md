# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > default > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { default: a = $(b)[$('x')] = c + d; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpNestedAssignObj = $(b);
      tmpNestedAssignComMemberObj = tmpNestedAssignObj;
      tmpNestedAssignComMemberProp = $('x');
      tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
      tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
      tmpNestedAssignCompMemberRhs = c + d;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      a = tmpNestedAssignCompMemberRhs;
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
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
$('a');
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 7;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
a = tmpNestedAssignCompMemberRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":7}
 - 2: "x"
 - 3: 7,{"x":7},3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], [{ x: 7 }], ['x'], [7, { x: 7 }, 7], null];

