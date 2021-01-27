# Preval test case

# simple_pattern.md

> normalize > assignment > case-block > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let a = [x, y] = z; break; }
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
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
        a = [x, y] = z;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
let a = 1;
let z = [10, 20, 30];
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
      a = [x, y] = z;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, 1, 2, z);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: 1,10,20,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'a' has already been declared ]>"];

