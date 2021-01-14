# Preval test case

# odd_early_return.md

> normalize > switch > odd_early_return
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
      if ($(8)) {                         
        if ($(9)) {                       
          return $(10);                   
        } else {                          
          $(11);                          
        }

        if ($(2)) {
          $(13);
        } else {
          return $(14);
        }
      }
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
            {
              let ifTestTmp_2 = $(8);
              if (ifTestTmp_2) {
                {
                  let ifTestTmp_3 = $(9);
                  if (ifTestTmp_3) {
                    {
                      let tmpStmtArg = $(10);
                      return tmpStmtArg;
                    }
                  } else {
                    $(11);
                  }
                }
                {
                  let ifTestTmp_4 = $(2);
                  if (ifTestTmp_4) {
                    $(13);
                  } else {
                    {
                      let tmpStmtArg_1 = $(14);
                      return tmpStmtArg_1;
                    }
                  }
                }
              }
            }
            $(3);
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp_5 = tmpFallthrough;
        if (ifTestTmp_5) {
        } else {
          tmpBinaryRight_1 = $(4);
          ifTestTmp_5 = tmpSwitchTest === tmpBinaryRight_1;
        }
        if (ifTestTmp_5) {
          ('case 2:');
          {
            $(5);
            {
              let tmpStmtArg_2 = $(6);
              return tmpStmtArg_2;
            }
          }
          tmpFallthrough = true;
        }
      }
      {
        let ifTestTmp_6 = tmpFallthrough;
        if (ifTestTmp_6) {
        } else {
          tmpBinaryRight_2 = $(7);
          ifTestTmp_6 = tmpSwitchTest === tmpBinaryRight_2;
        }
        if (ifTestTmp_6) {
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
            {
              var x = x(8);
              if (x) {
                {
                  var x = x(8);
                  if (x) {
                    {
                      var x = x(8);
                      return x;
                    }
                  } else {
                    x(8);
                  }
                }
                {
                  var x = x(8);
                  if (x) {
                    x(8);
                  } else {
                    {
                      var x = x(8);
                      return x;
                    }
                  }
                }
              }
            }
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
          {
            let ifTestTmp_2 = $(8);
            if (ifTestTmp_2) {
              {
                let ifTestTmp_3 = $(9);
                if (ifTestTmp_3) {
                  {
                    let tmpStmtArg = $(10);
                    return tmpStmtArg;
                  }
                } else {
                  $(11);
                }
              }
              {
                let ifTestTmp_4 = $(2);
                if (ifTestTmp_4) {
                  $(13);
                } else {
                  {
                    let tmpStmtArg_1 = $(14);
                    return tmpStmtArg_1;
                  }
                }
              }
            }
          }
          $(3);
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_5 = tmpFallthrough;
      if (ifTestTmp_5) {
      } else {
        tmpBinaryRight_1 = $(4);
        ifTestTmp_5 = tmpSwitchTest === tmpBinaryRight_1;
      }
      if (ifTestTmp_5) {
        ('case 2:');
        {
          $(5);
          {
            let tmpStmtArg_2 = $(6);
            return tmpStmtArg_2;
          }
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_6 = tmpFallthrough;
      if (ifTestTmp_6) {
      } else {
        tmpBinaryRight_2 = $(7);
        ifTestTmp_6 = tmpSwitchTest === tmpBinaryRight_2;
      }
      if (ifTestTmp_6) {
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
