# Preval test case

# odd_early_return.md

> Normalize > Switch > Odd early return
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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1);
    let tmpSwitchCaseToStart = 4;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if ($(4) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else if ($(7) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(2);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 1) {
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
      }
      if (tmpSwitchCaseToStart <= 2) {
        $(5);
        return $(6);
      }
      if (tmpSwitchCaseToStart <= 3) {
        break tmpSwitchBreak;
      }
    }
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingA = function () {
    debugger;
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$7 = tmpBinLhs$5 === tmpSwitchValue;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpBinLhs$11 = $(4);
      const tmpIfTest$13 = tmpBinLhs$11 === tmpSwitchValue;
      const tmpBranchingA$3 = function () {
        debugger;
        tmpSwitchCaseToStart = 2;
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$17 = tmpBinLhs$15 === tmpSwitchValue;
        const tmpBranchingA$5 = function () {
          debugger;
          tmpSwitchCaseToStart = 3;
          const tmpReturnArg$5 = tmpBranchingC$5();
          return tmpReturnArg$5;
        };
        const tmpBranchingB$5 = function () {
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$5();
          return tmpReturnArg$7;
        };
        const tmpBranchingC$5 = function () {
          debugger;
          const tmpReturnArg$9 = tmpBranchingC$3();
          return tmpReturnArg$9;
        };
        if (tmpIfTest$17) {
          const tmpReturnArg$11 = tmpBranchingA$5();
          return tmpReturnArg$11;
        } else {
          const tmpReturnArg$13 = tmpBranchingB$5();
          return tmpReturnArg$13;
        }
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$15 = tmpBranchingC$1();
        return tmpReturnArg$15;
      };
      if (tmpIfTest$13) {
        const tmpReturnArg$17 = tmpBranchingA$3();
        return tmpReturnArg$17;
      } else {
        const tmpReturnArg$19 = tmpBranchingB$3();
        return tmpReturnArg$19;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$21 = tmpBranchingC();
      return tmpReturnArg$21;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$23 = tmpBranchingA$1();
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1();
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$19 = tmpSwitchCaseToStart <= 0;
    const tmpBranchingA$7 = function () {
      debugger;
      $(2);
    };
    const tmpBranchingB$7 = function () {
      debugger;
      const tmpIfTest$33 = tmpSwitchCaseToStart <= 1;
      const tmpBranchingA$9 = function () {
        debugger;
        const tmpIfTest$45 = $(8);
        const tmpBranchingA$11 = function () {
          debugger;
          const tmpIfTest$53 = $(9);
          const tmpBranchingA$13 = function () {
            debugger;
            const tmpReturnArg$49 = $(10);
            return tmpReturnArg$49;
          };
          const tmpBranchingB$13 = function () {
            debugger;
            $(11);
            const tmpIfTest$57 = $(2);
            const tmpBranchingA$15 = function () {
              debugger;
              $(13);
              const tmpReturnArg$55 = tmpBranchingC$15();
              return tmpReturnArg$55;
            };
            const tmpBranchingB$15 = function () {
              debugger;
              const tmpReturnArg$53 = $(14);
              return tmpReturnArg$53;
            };
            const tmpBranchingC$15 = function () {
              debugger;
              const tmpReturnArg$57 = tmpBranchingC$13();
              return tmpReturnArg$57;
            };
            if (tmpIfTest$57) {
              const tmpReturnArg$59 = tmpBranchingA$15();
              return tmpReturnArg$59;
            } else {
              const tmpReturnArg$61 = tmpBranchingB$15();
              return tmpReturnArg$61;
            }
          };
          const tmpBranchingC$13 = function () {
            debugger;
            const tmpReturnArg$63 = tmpBranchingC$11();
            return tmpReturnArg$63;
          };
          if (tmpIfTest$53) {
            const tmpReturnArg$65 = tmpBranchingA$13();
            return tmpReturnArg$65;
          } else {
            const tmpReturnArg$67 = tmpBranchingB$13();
            return tmpReturnArg$67;
          }
        };
        const tmpBranchingB$11 = function () {
          debugger;
          const tmpReturnArg$69 = tmpBranchingC$11();
          return tmpReturnArg$69;
        };
        const tmpBranchingC$11 = function () {
          debugger;
          $(3);
          const tmpReturnArg$71 = tmpBranchingC$9();
          return tmpReturnArg$71;
        };
        if (tmpIfTest$45) {
          const tmpReturnArg$73 = tmpBranchingA$11();
          return tmpReturnArg$73;
        } else {
          const tmpReturnArg$75 = tmpBranchingB$11();
          return tmpReturnArg$75;
        }
      };
      const tmpBranchingB$9 = function () {
        debugger;
        const tmpReturnArg$77 = tmpBranchingC$9();
        return tmpReturnArg$77;
      };
      const tmpBranchingC$9 = function () {
        debugger;
        tmpIfTest$35 = tmpSwitchCaseToStart <= 2;
        const tmpBranchingA$17 = function () {
          debugger;
          $(5);
          const tmpReturnArg$79 = $(6);
          return tmpReturnArg$79;
        };
        const tmpBranchingB$17 = function () {
          debugger;
          const tmpIfTest$59 = tmpSwitchCaseToStart <= 3;
          const tmpBranchingA$19 = function () {
            debugger;
          };
          const tmpBranchingB$19 = function () {
            debugger;
            const tmpReturnArg$81 = tmpBranchingC$19();
            return tmpReturnArg$81;
          };
          const tmpBranchingC$19 = function () {
            debugger;
            const tmpReturnArg$83 = tmpBranchingC$17();
            return tmpReturnArg$83;
          };
          if (tmpIfTest$59) {
            const tmpReturnArg$85 = tmpBranchingA$19();
            return tmpReturnArg$85;
          } else {
            const tmpReturnArg$87 = tmpBranchingB$19();
            return tmpReturnArg$87;
          }
        };
        const tmpBranchingC$17 = function () {
          debugger;
          const tmpReturnArg$89 = tmpBranchingC$7();
          return tmpReturnArg$89;
        };
        if (tmpIfTest$35) {
          const tmpReturnArg$91 = tmpBranchingA$17();
          return tmpReturnArg$91;
        } else {
          const tmpReturnArg$93 = tmpBranchingB$17();
          return tmpReturnArg$93;
        }
      };
      let tmpIfTest$35 = undefined;
      if (tmpIfTest$33) {
        const tmpReturnArg$95 = tmpBranchingA$9();
        return tmpReturnArg$95;
      } else {
        const tmpReturnArg$97 = tmpBranchingB$9();
        return tmpReturnArg$97;
      }
    };
    const tmpBranchingC$7 = function () {
      debugger;
    };
    if (tmpIfTest$19) {
      const tmpReturnArg$99 = tmpBranchingA$7();
      return tmpReturnArg$99;
    } else {
      const tmpReturnArg$101 = tmpBranchingB$7();
      return tmpReturnArg$101;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$103 = tmpBranchingA();
    return tmpReturnArg$103;
  } else {
    const tmpReturnArg$105 = tmpBranchingB();
    return tmpReturnArg$105;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingB = function () {
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$7 = tmpBinLhs$5 === tmpSwitchValue;
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpBinLhs$11 = $(4);
      const tmpIfTest$13 = tmpBinLhs$11 === tmpSwitchValue;
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpBinLhs$15 = $(7);
        const tmpIfTest$17 = tmpBinLhs$15 === tmpSwitchValue;
        if (tmpIfTest$17) {
          tmpSwitchCaseToStart = 3;
          const tmpReturnArg$5 = tmpBranchingC();
          return tmpReturnArg$5;
        } else {
          const tmpReturnArg$13 = tmpBranchingC();
          return tmpReturnArg$13;
        }
      };
      if (tmpIfTest$13) {
        tmpSwitchCaseToStart = 2;
        const tmpReturnArg$3 = tmpBranchingC();
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$19 = tmpBranchingB$3();
        return tmpReturnArg$19;
      }
    };
    if (tmpIfTest$7) {
      tmpSwitchCaseToStart = 1;
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1();
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$19 = tmpSwitchCaseToStart <= 0;
    const tmpBranchingB$7 = function () {
      debugger;
      const tmpIfTest$33 = tmpSwitchCaseToStart <= 1;
      const tmpBranchingA$9 = function () {
        debugger;
        const tmpIfTest$45 = $(8);
        const tmpBranchingA$11 = function () {
          debugger;
          const tmpIfTest$53 = $(9);
          const tmpBranchingB$13 = function () {
            debugger;
            $(11);
            const tmpIfTest$57 = $(2);
            if (tmpIfTest$57) {
              $(13);
              const tmpReturnArg$55 = tmpBranchingC$11();
              return tmpReturnArg$55;
            } else {
              const tmpReturnArg$61 = $(14);
              return tmpReturnArg$61;
            }
          };
          if (tmpIfTest$53) {
            const tmpReturnArg$65 = $(10);
            return tmpReturnArg$65;
          } else {
            const tmpReturnArg$67 = tmpBranchingB$13();
            return tmpReturnArg$67;
          }
        };
        const tmpBranchingC$11 = function () {
          debugger;
          $(3);
          const tmpReturnArg$71 = tmpBranchingC$9();
          return tmpReturnArg$71;
        };
        if (tmpIfTest$45) {
          const tmpReturnArg$73 = tmpBranchingA$11();
          return tmpReturnArg$73;
        } else {
          const tmpReturnArg$75 = tmpBranchingC$11();
          return tmpReturnArg$75;
        }
      };
      const tmpBranchingC$9 = function () {
        debugger;
        tmpIfTest$35 = tmpSwitchCaseToStart <= 2;
        const tmpBranchingB$17 = function () {
          debugger;
          const tmpIfTest$59 = tmpSwitchCaseToStart <= 3;
          if (tmpIfTest$59) {
            return undefined;
          } else {
            return undefined;
          }
        };
        if (tmpIfTest$35) {
          $(5);
          const tmpReturnArg$79 = $(6);
          return tmpReturnArg$79;
        } else {
          const tmpReturnArg$93 = tmpBranchingB$17();
          return tmpReturnArg$93;
        }
      };
      let tmpIfTest$35 = undefined;
      if (tmpIfTest$33) {
        const tmpReturnArg$95 = tmpBranchingA$9();
        return tmpReturnArg$95;
      } else {
        const tmpReturnArg$97 = tmpBranchingC$9();
        return tmpReturnArg$97;
      }
    };
    if (tmpIfTest$19) {
      $(2);
      return undefined;
    } else {
      const tmpReturnArg$101 = tmpBranchingB$7();
      return tmpReturnArg$101;
    }
  };
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$105 = tmpBranchingB();
    return tmpReturnArg$105;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 8
 - 4: 9
 - 5: 10
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
