# Preval test case

# early_return.md

> normalize > switch > early_return
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1)) {
    case 0:
      $(2);
      break;
    case $(1):
      $(3);
    case $(4):
      $(5);
      return $(6);
    case $(7):
      break;
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpBinaryLeft;
  var tmpBinaryRight;
  var tmpBinaryLeft_1;
  var tmpBinaryRight_1;
  var tmpBinaryLeft_2;
  var tmpBinaryRight_2;
  {
    const tmpSwitchTest = $(1);
    tmpSwitchBreak: {
      let tmpFallthrough = false;
      {
        let ifTestTmp = tmpFallthrough;
        if (ifTestTmp) {
        } else {
          ifTestTmp = tmpSwitchTest === 0;
        }
        if (ifTestTmp) {
          ('case 0:');
          {
            $(2);
            break tmpSwitchBreak;
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp_1 = tmpFallthrough;
        if (ifTestTmp_1) {
        } else {
          tmpBinaryLeft = tmpSwitchTest;
          tmpBinaryRight = $(1);
          ifTestTmp_1 = tmpBinaryLeft === tmpBinaryRight;
        }
        if (ifTestTmp_1) {
          ('case 1:');
          {
            $(3);
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp_2 = tmpFallthrough;
        if (ifTestTmp_2) {
        } else {
          tmpBinaryLeft_1 = tmpSwitchTest;
          tmpBinaryRight_1 = $(4);
          ifTestTmp_2 = tmpBinaryLeft_1 === tmpBinaryRight_1;
        }
        if (ifTestTmp_2) {
          ('case 2:');
          {
            $(5);
            {
              let tmpStmtArg = $(6);
              return tmpStmtArg;
            }
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp_3 = tmpFallthrough;
        if (ifTestTmp_3) {
        } else {
          tmpBinaryLeft_2 = tmpSwitchTest;
          tmpBinaryRight_2 = $(7);
          ifTestTmp_3 = tmpBinaryLeft_2 === tmpBinaryRight_2;
        }
        if (ifTestTmp_3) {
          ('case 3:');
          {
            break tmpSwitchBreak;
          }
          tmpFallthrough = true;
        }
      }
    }
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        ifTestTmp = tmpSwitchTest === 0;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          $(2);
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_1 = tmpFallthrough;
      if (ifTestTmp_1) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $(1);
        ifTestTmp_1 = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp_1) {
        ('case 1:');
        {
          $(3);
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_2 = tmpFallthrough;
      if (ifTestTmp_2) {
      } else {
        tmpBinaryLeft_1 = tmpSwitchTest;
        tmpBinaryRight_1 = $(4);
        ifTestTmp_2 = tmpBinaryLeft_1 === tmpBinaryRight_1;
      }
      if (ifTestTmp_2) {
        ('case 2:');
        {
          $(5);
          {
            let tmpStmtArg = $(6);
            return tmpStmtArg;
          }
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_3 = tmpFallthrough;
      if (ifTestTmp_3) {
      } else {
        tmpBinaryLeft_2 = tmpSwitchTest;
        tmpBinaryRight_2 = $(7);
        ifTestTmp_3 = tmpBinaryLeft_2 === tmpBinaryRight_2;
      }
      if (ifTestTmp_3) {
        ('case 3:');
        {
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 1
 - 2: 3
 - 3: 5
 - 4: 6
 - 5: null
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], '<crash[ <ref> is not defined ]>'];

