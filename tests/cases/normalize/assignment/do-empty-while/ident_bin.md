# Preval test case

# ident_bin.md

> normalize > assignment > do-while > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
do {} while (a = b + $(c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let b = 2;
let c = 3;
while (true) {
  {
    tmpBinaryLeft = b;
    tmpBinaryRight = $(c);
    a = tmpBinaryLeft + tmpBinaryRight;
    let ifTestTmp = a;
    if (ifTestTmp) {
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
var tmpBinaryRight;
let a = 1;
while (true) {
  tmpBinaryLeft = 2;
  tmpBinaryRight = $(3);
  a = tmpBinaryLeft + tmpBinaryRight;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: null,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
