# Preval test case

# ident_ident_assign.md

> normalize > assignment > case-block > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b = $(c).y = $(d); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
{
  let a;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $('a');
      tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        a = b = $(c).y = $(d);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$('a');
let a;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = tmpSwitchTest;
    tmpBinaryRight = $('a');
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      a = b = $(c).y = $(d);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: 3
 - 3: 4
 - 4: 1,4,3
 - 5: undefined

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'a' has already been declared ]>"];

