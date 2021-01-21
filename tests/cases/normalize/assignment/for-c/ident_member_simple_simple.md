# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > for-c > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let n = 1;
for (;n-->0;  a = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = tmpPostfixArg;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        tmpNestedPropAssignRhs = c;
        b.x = tmpNestedPropAssignRhs;
        a = tmpNestedPropAssignRhs;
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
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpNestedPropAssignRhs = 3;
    b.x = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3,{"x":3},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
