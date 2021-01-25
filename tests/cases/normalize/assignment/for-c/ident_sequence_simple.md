# Preval test case

# ident_sequence_simple.md

> normalize > assignment > for-c > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 1;
for (;n-->0;  a = ($(b), c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
let a = 1;
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
      $(b);
      a = c;
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
let a = 1;
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  const tmpIfTest = tmpBinaryLeft > 0;
  if (tmpIfTest) {
    $(2);
    a = 3;
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
