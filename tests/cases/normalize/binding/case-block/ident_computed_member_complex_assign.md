# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > case-block > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = $(b)[$('x')] = $(c)[$('y')] = $(d); break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let b = { x: 2 };
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
        a = $(b)[$('x')] = $(c)[$('y')] = $(d);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
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
      a = $(b)[$('x')] = $(c)[$('y')] = $(d);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: {"x":4}
 - 3: "x"
 - 4: 3
 - 5: "y"
 - 6: 4
 - 7: 1,{"x":4},3,4
 - 8: undefined

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'a' has already been declared ]>"];

