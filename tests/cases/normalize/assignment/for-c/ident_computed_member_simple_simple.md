# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > for-c > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let n = 1;
for (;n-->0;  a = b[$('x')] = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = n;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        tmpNestedAssignComMemberObj = b;
        tmpNestedAssignComMemberProp = $('x');
        tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
        a = c;
      } else {
        break;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = n;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpNestedAssignComMemberObj = b;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
    a = 3;
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
[['x'], [3, { x: 2, undefined: 3 }, 3], null];

Normalized calls: BAD?!
[[1, { x: 2 }, 3], null];

Final output calls: BAD!!
[[1, { x: 2 }, 3], null];

