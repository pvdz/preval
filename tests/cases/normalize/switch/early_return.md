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
  var tmpBinaryRight;
  var tmpBinaryRight_1;
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
          tmpBinaryRight = $(1);
          ifTestTmp_1 = tmpSwitchTest === tmpBinaryRight;
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
          tmpBinaryRight_1 = $(4);
          ifTestTmp_2 = tmpSwitchTest === tmpBinaryRight_1;
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
          tmpBinaryRight_2 = $(7);
          ifTestTmp_3 = tmpSwitchTest === tmpBinaryRight_2;
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

## Uniformed

`````js filename=intro
function x() {
  var x;
  var x;
  var x;
  {
    var x = x(8);
    x: {
      var x = x;
      {
        var x = x;
        if (x) {
        } else {
          x = x * 8;
        }
        if (x) {
          ('str');
          {
            x(8);
            break x;
          }
          x = x;
        }
      }
      {
        var x = x;
        if (x) {
        } else {
          x = x(8);
          x = x * x;
        }
        if (x) {
          ('str');
          {
            x(8);
          }
          x = x;
        }
      }
      {
        var x = x;
        if (x) {
        } else {
          x = x(8);
          x = x * x;
        }
        if (x) {
          ('str');
          {
            x(8);
            {
              var x = x(8);
              return x;
            }
          }
          x = x;
        }
      }
      {
        var x = x;
        if (x) {
        } else {
          x = x(8);
          x = x * x;
        }
        if (x) {
          ('str');
          {
            break x;
          }
          x = x;
        }
      }
    }
  }
}
var x;
x = x();
x(x);
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
        tmpBinaryRight = $(1);
        ifTestTmp_1 = tmpSwitchTest === tmpBinaryRight;
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
        tmpBinaryRight_1 = $(4);
        ifTestTmp_2 = tmpSwitchTest === tmpBinaryRight_1;
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
        tmpBinaryRight_2 = $(7);
        ifTestTmp_3 = tmpSwitchTest === tmpBinaryRight_2;
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
