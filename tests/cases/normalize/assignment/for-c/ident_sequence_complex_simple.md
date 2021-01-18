# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 1;
for (;n-->0;  a = ($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
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
        $(b);
        tmpNestedAssignObj = $(c);
        tmpNestedAssignObj.x = c;
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
var tmpNestedAssignObj;
let a = 1;
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    $(2);
    tmpNestedAssignObj = $(3);
    tmpNestedAssignObj.x = 3;
    a = 3;
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2], [3], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
