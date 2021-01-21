# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > for-let > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let wat = a = b[$('x')] = c; false;);
$(wat);
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
  let wat_1 = a;
  while (false) {}
}
$(wat_1);
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
let wat_1 = a;
while (false) {}
$(wat_1);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: BAD!!
[['x'], [3], [3, { x: 2, undefined: 3 }, 3], null];

