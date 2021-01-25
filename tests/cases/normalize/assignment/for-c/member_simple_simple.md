# Preval test case

# member_simple_simple.md

> normalize > assignment > for-c > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 1;
for (;n-->0;  a.x = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
let a = { x: 10 };
let b = 2;
let c = 3;
let n = 1;
{
  while (true) {
    tmpPostfixArg = n;
    n = n - 1;
    tmpBinaryLeft = tmpPostfixArg;
    const tmpIfTest = tmpBinaryLeft > 0;
    if (tmpIfTest) {
      a.x = b;
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
let a = { x: 10 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  const tmpIfTest = tmpBinaryLeft > 0;
  if (tmpIfTest) {
    a.x = 2;
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2},2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
