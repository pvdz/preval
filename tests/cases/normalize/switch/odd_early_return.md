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
          tmpBinaryLeft_1 = tmpSwitchTest;
          tmpBinaryRight_1 = $(4);
          ifTestTmp_5 = tmpBinaryLeft_1 === tmpBinaryRight_1;
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
          tmpBinaryLeft_2 = tmpSwitchTest;
          tmpBinaryRight_2 = $(7);
          ifTestTmp_6 = tmpBinaryLeft_2 === tmpBinaryRight_2;
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
        tmpBinaryLeft_1 = tmpSwitchTest;
        tmpBinaryRight_1 = $(4);
        ifTestTmp_5 = tmpBinaryLeft_1 === tmpBinaryRight_1;
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
        tmpBinaryLeft_2 = tmpSwitchTest;
        tmpBinaryRight_2 = $(7);
        ifTestTmp_6 = tmpBinaryLeft_2 === tmpBinaryRight_2;
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

## Result

Should call `$` with:
 - 0: 1
 - 1: 1
 - 2: 8
 - 3: 3
 - 4: 5
 - 5: 6
 - 6: null
 - 7: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], '<crash[ <ref> is not defined ]>'];

