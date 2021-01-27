# Preval test case

# ident_simple.md

> normalize > assignment > case-block > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = b; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let b = 2;
let c = 3;
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
        a = b;
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
      a = b;
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
 - 2: 1,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'a' has already been declared ]>"];

