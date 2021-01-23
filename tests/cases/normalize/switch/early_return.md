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
  var tmpBinaryLeft$1;
  var tmpBinaryLeft$2;
  var tmpBinaryRight;
  var tmpBinaryRight$1;
  var tmpBinaryRight$2;
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
        let ifTestTmp$1 = tmpFallthrough;
        if (ifTestTmp$1) {
        } else {
          tmpBinaryLeft = tmpSwitchTest;
          tmpBinaryRight = $(1);
          ifTestTmp$1 = tmpBinaryLeft === tmpBinaryRight;
        }
        if (ifTestTmp$1) {
          ('case 1:');
          {
            $(3);
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp$2 = tmpFallthrough;
        if (ifTestTmp$2) {
        } else {
          tmpBinaryLeft$1 = tmpSwitchTest;
          tmpBinaryRight$1 = $(4);
          ifTestTmp$2 = tmpBinaryLeft$1 === tmpBinaryRight$1;
        }
        if (ifTestTmp$2) {
          ('case 2:');
          {
            $(5);
            {
              let tmpReturnArg = $(6);
              return tmpReturnArg;
            }
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp$3 = tmpFallthrough;
        if (ifTestTmp$3) {
        } else {
          tmpBinaryLeft$2 = tmpSwitchTest;
          tmpBinaryRight$2 = $(7);
          ifTestTmp$3 = tmpBinaryLeft$2 === tmpBinaryRight$2;
        }
        if (ifTestTmp$3) {
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
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg` decl without init>');
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
      let ifTestTmp$1 = tmpFallthrough;
      if (ifTestTmp$1) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $(1);
        ifTestTmp$1 = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp$1) {
        ('case 1:');
        {
          $(3);
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp$2 = tmpFallthrough;
      if (ifTestTmp$2) {
      } else {
        tmpBinaryLeft$1 = tmpSwitchTest;
        tmpBinaryRight$1 = $(4);
        ifTestTmp$2 = tmpBinaryLeft$1 === tmpBinaryRight$1;
      }
      if (ifTestTmp$2) {
        ('case 2:');
        {
          $(5);
          {
            let tmpReturnArg = $(6);
            return tmpReturnArg;
          }
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp$3 = tmpFallthrough;
      if (ifTestTmp$3) {
      } else {
        tmpBinaryLeft$2 = tmpSwitchTest;
        tmpBinaryRight$2 = $(7);
        ifTestTmp$3 = tmpBinaryLeft$2 === tmpBinaryRight$2;
      }
      if (ifTestTmp$3) {
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
 - 5: 6
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], '<crash[ <ref> is not defined ]>'];

