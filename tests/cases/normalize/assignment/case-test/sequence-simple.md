# Preval test case

# sequence-simple.md

> normalize > assignment > case-test > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
switch (1) { case (a, b).c = d: $('yes'); break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      a;
      tmpNestedAssignObj = b;
      tmpNestedAssignObj.c = d;
      tmpBinaryRight = d;
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('yes');
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
let b = { c: 2 };
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      a;
      tmpNestedAssignObj = b;
      tmpNestedAssignObj.c = d;
      tmpBinaryRight = d;
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('yes');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same