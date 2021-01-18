# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-c > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let n = 1;
for (;n-->0;  a = b = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = tmpPostfixArg;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        tmpNestedComplexRhs = c + d;
        b = tmpNestedComplexRhs;
        a = tmpNestedComplexRhs;
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
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpNestedComplexRhs = 7;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b, 7);
`````

## Result

Should call `$` with:
[[7, 7, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[7, 7, 7], null];

