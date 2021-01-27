# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > case-block > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(x), $(y), $(z)); break; }
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let x = 1;
let y = 2;
let z = [10, 20, 30];
const tmpSwitchTest = $('a');
{
  let x;
  let y;
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
        $(x);
        $(y);
        [x, y] = $(z);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
$('a');
let x;
let y;
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
      $(x);
      $(y);
      [x, y] = $(z);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: <crash[ Cannot access 'x' before initialization ]>

Normalized calls: BAD?!
[['a'], ['a'], [null], [null], [[10, 20, 30]], [1, 2, [10, 20, 30]], null];

Final output calls: BAD!!
["<crash[ Identifier 'x' has already been declared ]>"];

