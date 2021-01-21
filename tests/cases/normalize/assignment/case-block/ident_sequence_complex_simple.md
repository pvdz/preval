# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): a = ($(b), $(c)).x = c; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $('a');
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          $(b);
          tmpNestedAssignObj = $(c);
          tmpNestedAssignObj.x = c;
          a = c;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
$('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $('a');
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $(b);
        tmpNestedAssignObj = $(c);
        tmpNestedAssignObj.x = c;
        a = c;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: 2
 - 3: 3
 - 4: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

