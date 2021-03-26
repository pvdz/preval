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
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    tmpSwitchCaseToStart$1 = 0;
    const tmpReturnArg = tmpBranchingC(tmpSwitchValue$1, tmpSwitchCaseToStart$1, tmpIfTest$7);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$11 = tmpBinLhs$5 === tmpSwitchValue$3;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$7 = $$0;
      let tmpSwitchCaseToStart$7 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpBinLhs$11 = $$3;
      let tmpIfTest$21 = $$4;
      debugger;
      tmpSwitchCaseToStart$7 = 1;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpSwitchValue$7, tmpSwitchCaseToStart$7, tmpIfTest$19, tmpBinLhs$11, tmpIfTest$21);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$9 = $$0;
      let tmpSwitchCaseToStart$9 = $$1;
      let tmpIfTest$23 = $$2;
      let tmpBinLhs$13 = $$3;
      let tmpIfTest$25 = $$4;
      debugger;
      const tmpBinLhs$15 = $(4);
      const tmpIfTest$27 = tmpBinLhs$15 === tmpSwitchValue$9;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$13 = $$0;
        let tmpSwitchCaseToStart$13 = $$1;
        let tmpIfTest$35 = $$2;
        let tmpBinLhs$21 = $$3;
        let tmpIfTest$37 = $$4;
        let tmpBinLhs$23 = $$5;
        let tmpIfTest$39 = $$6;
        debugger;
        tmpSwitchCaseToStart$13 = 2;
        const tmpReturnArg$3 = tmpBranchingC$3(
          tmpSwitchValue$13,
          tmpSwitchCaseToStart$13,
          tmpIfTest$35,
          tmpBinLhs$21,
          tmpIfTest$37,
          tmpBinLhs$23,
          tmpIfTest$39,
        );
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$15 = $$0;
        let tmpSwitchCaseToStart$15 = $$1;
        let tmpIfTest$41 = $$2;
        let tmpBinLhs$25 = $$3;
        let tmpIfTest$43 = $$4;
        let tmpBinLhs$27 = $$5;
        let tmpIfTest$45 = $$6;
        debugger;
        const tmpBinLhs$29 = $(7);
        const tmpIfTest$47 = tmpBinLhs$29 === tmpSwitchValue$15;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$19 = $$0;
          let tmpSwitchCaseToStart$19 = $$1;
          let tmpIfTest$55 = $$2;
          let tmpBinLhs$35 = $$3;
          let tmpIfTest$57 = $$4;
          let tmpBinLhs$37 = $$5;
          let tmpIfTest$59 = $$6;
          let tmpBinLhs$39 = $$7;
          let tmpIfTest$61 = $$8;
          debugger;
          tmpSwitchCaseToStart$19 = 3;
          const tmpReturnArg$5 = tmpBranchingC$5(
            tmpSwitchValue$19,
            tmpSwitchCaseToStart$19,
            tmpIfTest$55,
            tmpBinLhs$35,
            tmpIfTest$57,
            tmpBinLhs$37,
            tmpIfTest$59,
            tmpBinLhs$39,
            tmpIfTest$61,
          );
          return tmpReturnArg$5;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$21 = $$0;
          let tmpSwitchCaseToStart$21 = $$1;
          let tmpIfTest$63 = $$2;
          let tmpBinLhs$41 = $$3;
          let tmpIfTest$65 = $$4;
          let tmpBinLhs$43 = $$5;
          let tmpIfTest$67 = $$6;
          let tmpBinLhs$45 = $$7;
          let tmpIfTest$69 = $$8;
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$5(
            tmpSwitchValue$21,
            tmpSwitchCaseToStart$21,
            tmpIfTest$63,
            tmpBinLhs$41,
            tmpIfTest$65,
            tmpBinLhs$43,
            tmpIfTest$67,
            tmpBinLhs$45,
            tmpIfTest$69,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
          let tmpSwitchValue$23 = $$0;
          let tmpSwitchCaseToStart$23 = $$1;
          let tmpIfTest$71 = $$2;
          let tmpBinLhs$47 = $$3;
          let tmpIfTest$73 = $$4;
          let tmpBinLhs$49 = $$5;
          let tmpIfTest$75 = $$6;
          let tmpBinLhs$51 = $$7;
          let tmpIfTest$77 = $$8;
          debugger;
          const tmpReturnArg$9 = tmpBranchingC$3(
            tmpSwitchValue$23,
            tmpSwitchCaseToStart$23,
            tmpIfTest$71,
            tmpBinLhs$47,
            tmpIfTest$73,
            tmpBinLhs$49,
            tmpIfTest$75,
          );
          return tmpReturnArg$9;
        };
        if (tmpIfTest$47) {
          const tmpReturnArg$11 = tmpBranchingA$5(
            tmpSwitchValue$15,
            tmpSwitchCaseToStart$15,
            tmpIfTest$41,
            tmpBinLhs$25,
            tmpIfTest$43,
            tmpBinLhs$27,
            tmpIfTest$45,
            tmpBinLhs$29,
            tmpIfTest$47,
          );
          return tmpReturnArg$11;
        } else {
          const tmpReturnArg$13 = tmpBranchingB$5(
            tmpSwitchValue$15,
            tmpSwitchCaseToStart$15,
            tmpIfTest$41,
            tmpBinLhs$25,
            tmpIfTest$43,
            tmpBinLhs$27,
            tmpIfTest$45,
            tmpBinLhs$29,
            tmpIfTest$47,
          );
          return tmpReturnArg$13;
        }
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpSwitchValue$17 = $$0;
        let tmpSwitchCaseToStart$17 = $$1;
        let tmpIfTest$49 = $$2;
        let tmpBinLhs$31 = $$3;
        let tmpIfTest$51 = $$4;
        let tmpBinLhs$33 = $$5;
        let tmpIfTest$53 = $$6;
        debugger;
        const tmpReturnArg$15 = tmpBranchingC$1(tmpSwitchValue$17, tmpSwitchCaseToStart$17, tmpIfTest$49, tmpBinLhs$31, tmpIfTest$51);
        return tmpReturnArg$15;
      };
      if (tmpIfTest$27) {
        const tmpReturnArg$17 = tmpBranchingA$3(
          tmpSwitchValue$9,
          tmpSwitchCaseToStart$9,
          tmpIfTest$23,
          tmpBinLhs$13,
          tmpIfTest$25,
          tmpBinLhs$15,
          tmpIfTest$27,
        );
        return tmpReturnArg$17;
      } else {
        const tmpReturnArg$19 = tmpBranchingB$3(
          tmpSwitchValue$9,
          tmpSwitchCaseToStart$9,
          tmpIfTest$23,
          tmpBinLhs$13,
          tmpIfTest$25,
          tmpBinLhs$15,
          tmpIfTest$27,
        );
        return tmpReturnArg$19;
      }
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpSwitchValue$11 = $$0;
      let tmpSwitchCaseToStart$11 = $$1;
      let tmpIfTest$31 = $$2;
      let tmpBinLhs$19 = $$3;
      let tmpIfTest$33 = $$4;
      debugger;
      const tmpReturnArg$21 = tmpBranchingC(tmpSwitchValue$11, tmpSwitchCaseToStart$11, tmpIfTest$31);
      return tmpReturnArg$21;
    };
    if (tmpIfTest$11) {
      const tmpReturnArg$23 = tmpBranchingA$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9, tmpBinLhs$5, tmpIfTest$11);
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$9, tmpBinLhs$5, tmpIfTest$11);
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpSwitchValue$5 = $$0;
    let tmpSwitchCaseToStart$5 = $$1;
    let tmpIfTest$17 = $$2;
    debugger;
    const tmpIfTest$79 = tmpSwitchCaseToStart$5 <= 0;
    const tmpBranchingA$7 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$25 = $$0;
      let tmpSwitchCaseToStart$25 = $$1;
      let tmpIfTest$93 = $$2;
      let tmpIfTest$95 = $$3;
      debugger;
      $(2);
    };
    const tmpBranchingB$7 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$27 = $$0;
      let tmpSwitchCaseToStart$27 = $$1;
      let tmpIfTest$97 = $$2;
      let tmpIfTest$99 = $$3;
      debugger;
      const tmpIfTest$101 = tmpSwitchCaseToStart$27 <= 1;
      const tmpBranchingA$9 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$31 = $$0;
        let tmpSwitchCaseToStart$31 = $$1;
        let tmpIfTest$117 = $$2;
        let tmpIfTest$119 = $$3;
        let tmpIfTest$121 = $$4;
        debugger;
        const tmpIfTest$123 = $(8);
        const tmpBranchingA$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$37 = $$0;
          let tmpSwitchCaseToStart$37 = $$1;
          let tmpIfTest$145 = $$2;
          let tmpIfTest$147 = $$3;
          let tmpIfTest$149 = $$4;
          let tmpIfTest$151 = $$5;
          debugger;
          const tmpIfTest$153 = $(9);
          const tmpBranchingA$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$43 = $$0;
            let tmpSwitchCaseToStart$43 = $$1;
            let tmpIfTest$173 = $$2;
            let tmpIfTest$175 = $$3;
            let tmpIfTest$177 = $$4;
            let tmpIfTest$179 = $$5;
            let tmpIfTest$181 = $$6;
            debugger;
            const tmpReturnArg$49 = $(10);
            return tmpReturnArg$49;
          };
          const tmpBranchingB$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$45 = $$0;
            let tmpSwitchCaseToStart$45 = $$1;
            let tmpIfTest$183 = $$2;
            let tmpIfTest$185 = $$3;
            let tmpIfTest$187 = $$4;
            let tmpIfTest$189 = $$5;
            let tmpIfTest$191 = $$6;
            debugger;
            $(11);
            const tmpIfTest$193 = $(2);
            const tmpBranchingA$15 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
              let tmpSwitchValue$49 = $$0;
              let tmpSwitchCaseToStart$49 = $$1;
              let tmpIfTest$205 = $$2;
              let tmpIfTest$207 = $$3;
              let tmpIfTest$209 = $$4;
              let tmpIfTest$211 = $$5;
              let tmpIfTest$213 = $$6;
              let tmpIfTest$215 = $$7;
              debugger;
              $(13);
              const tmpReturnArg$55 = tmpBranchingC$15(
                tmpSwitchValue$49,
                tmpSwitchCaseToStart$49,
                tmpIfTest$205,
                tmpIfTest$207,
                tmpIfTest$209,
                tmpIfTest$211,
                tmpIfTest$213,
                tmpIfTest$215,
              );
              return tmpReturnArg$55;
            };
            const tmpBranchingB$15 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
              let tmpSwitchValue$51 = $$0;
              let tmpSwitchCaseToStart$51 = $$1;
              let tmpIfTest$217 = $$2;
              let tmpIfTest$219 = $$3;
              let tmpIfTest$221 = $$4;
              let tmpIfTest$223 = $$5;
              let tmpIfTest$225 = $$6;
              let tmpIfTest$227 = $$7;
              debugger;
              const tmpReturnArg$53 = $(14);
              return tmpReturnArg$53;
            };
            const tmpBranchingC$15 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
              let tmpSwitchValue$53 = $$0;
              let tmpSwitchCaseToStart$53 = $$1;
              let tmpIfTest$229 = $$2;
              let tmpIfTest$231 = $$3;
              let tmpIfTest$233 = $$4;
              let tmpIfTest$235 = $$5;
              let tmpIfTest$237 = $$6;
              let tmpIfTest$239 = $$7;
              debugger;
              const tmpReturnArg$57 = tmpBranchingC$13(
                tmpSwitchValue$53,
                tmpSwitchCaseToStart$53,
                tmpIfTest$229,
                tmpIfTest$231,
                tmpIfTest$233,
                tmpIfTest$235,
                tmpIfTest$237,
              );
              return tmpReturnArg$57;
            };
            if (tmpIfTest$193) {
              const tmpReturnArg$59 = tmpBranchingA$15(
                tmpSwitchValue$45,
                tmpSwitchCaseToStart$45,
                tmpIfTest$183,
                tmpIfTest$185,
                tmpIfTest$187,
                tmpIfTest$189,
                tmpIfTest$191,
                tmpIfTest$193,
              );
              return tmpReturnArg$59;
            } else {
              const tmpReturnArg$61 = tmpBranchingB$15(
                tmpSwitchValue$45,
                tmpSwitchCaseToStart$45,
                tmpIfTest$183,
                tmpIfTest$185,
                tmpIfTest$187,
                tmpIfTest$189,
                tmpIfTest$191,
                tmpIfTest$193,
              );
              return tmpReturnArg$61;
            }
          };
          const tmpBranchingC$13 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$47 = $$0;
            let tmpSwitchCaseToStart$47 = $$1;
            let tmpIfTest$195 = $$2;
            let tmpIfTest$197 = $$3;
            let tmpIfTest$199 = $$4;
            let tmpIfTest$201 = $$5;
            let tmpIfTest$203 = $$6;
            debugger;
            const tmpReturnArg$63 = tmpBranchingC$11(
              tmpSwitchValue$47,
              tmpSwitchCaseToStart$47,
              tmpIfTest$195,
              tmpIfTest$197,
              tmpIfTest$199,
              tmpIfTest$201,
            );
            return tmpReturnArg$63;
          };
          if (tmpIfTest$153) {
            const tmpReturnArg$65 = tmpBranchingA$13(
              tmpSwitchValue$37,
              tmpSwitchCaseToStart$37,
              tmpIfTest$145,
              tmpIfTest$147,
              tmpIfTest$149,
              tmpIfTest$151,
              tmpIfTest$153,
            );
            return tmpReturnArg$65;
          } else {
            const tmpReturnArg$67 = tmpBranchingB$13(
              tmpSwitchValue$37,
              tmpSwitchCaseToStart$37,
              tmpIfTest$145,
              tmpIfTest$147,
              tmpIfTest$149,
              tmpIfTest$151,
              tmpIfTest$153,
            );
            return tmpReturnArg$67;
          }
        };
        const tmpBranchingB$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$39 = $$0;
          let tmpSwitchCaseToStart$39 = $$1;
          let tmpIfTest$157 = $$2;
          let tmpIfTest$159 = $$3;
          let tmpIfTest$161 = $$4;
          let tmpIfTest$163 = $$5;
          debugger;
          const tmpReturnArg$69 = tmpBranchingC$11(
            tmpSwitchValue$39,
            tmpSwitchCaseToStart$39,
            tmpIfTest$157,
            tmpIfTest$159,
            tmpIfTest$161,
            tmpIfTest$163,
          );
          return tmpReturnArg$69;
        };
        const tmpBranchingC$11 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$41 = $$0;
          let tmpSwitchCaseToStart$41 = $$1;
          let tmpIfTest$165 = $$2;
          let tmpIfTest$167 = $$3;
          let tmpIfTest$169 = $$4;
          let tmpIfTest$171 = $$5;
          debugger;
          $(3);
          const tmpReturnArg$71 = tmpBranchingC$9(tmpSwitchValue$41, tmpSwitchCaseToStart$41, tmpIfTest$165, tmpIfTest$167, tmpIfTest$169);
          return tmpReturnArg$71;
        };
        if (tmpIfTest$123) {
          const tmpReturnArg$73 = tmpBranchingA$11(
            tmpSwitchValue$31,
            tmpSwitchCaseToStart$31,
            tmpIfTest$117,
            tmpIfTest$119,
            tmpIfTest$121,
            tmpIfTest$123,
          );
          return tmpReturnArg$73;
        } else {
          const tmpReturnArg$75 = tmpBranchingB$11(
            tmpSwitchValue$31,
            tmpSwitchCaseToStart$31,
            tmpIfTest$117,
            tmpIfTest$119,
            tmpIfTest$121,
            tmpIfTest$123,
          );
          return tmpReturnArg$75;
        }
      };
      const tmpBranchingB$9 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$33 = $$0;
        let tmpSwitchCaseToStart$33 = $$1;
        let tmpIfTest$129 = $$2;
        let tmpIfTest$131 = $$3;
        let tmpIfTest$133 = $$4;
        debugger;
        const tmpReturnArg$77 = tmpBranchingC$9(tmpSwitchValue$33, tmpSwitchCaseToStart$33, tmpIfTest$129, tmpIfTest$131, tmpIfTest$133);
        return tmpReturnArg$77;
      };
      const tmpBranchingC$9 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpSwitchValue$35 = $$0;
        let tmpSwitchCaseToStart$35 = $$1;
        let tmpIfTest$135 = $$2;
        let tmpIfTest$137 = $$3;
        let tmpIfTest$139 = $$4;
        debugger;
        const tmpIfTest$141 = tmpSwitchCaseToStart$35 <= 2;
        const tmpBranchingA$17 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$55 = $$0;
          let tmpSwitchCaseToStart$55 = $$1;
          let tmpIfTest$241 = $$2;
          let tmpIfTest$243 = $$3;
          let tmpIfTest$245 = $$4;
          let tmpIfTest$247 = $$5;
          debugger;
          $(5);
          const tmpReturnArg$79 = $(6);
          return tmpReturnArg$79;
        };
        const tmpBranchingB$17 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$57 = $$0;
          let tmpSwitchCaseToStart$57 = $$1;
          let tmpIfTest$249 = $$2;
          let tmpIfTest$251 = $$3;
          let tmpIfTest$253 = $$4;
          let tmpIfTest$255 = $$5;
          debugger;
          const tmpIfTest$257 = tmpSwitchCaseToStart$57 <= 3;
          const tmpBranchingA$19 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$61 = $$0;
            let tmpSwitchCaseToStart$61 = $$1;
            let tmpIfTest$267 = $$2;
            let tmpIfTest$269 = $$3;
            let tmpIfTest$271 = $$4;
            let tmpIfTest$273 = $$5;
            let tmpIfTest$275 = $$6;
            debugger;
          };
          const tmpBranchingB$19 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$63 = $$0;
            let tmpSwitchCaseToStart$63 = $$1;
            let tmpIfTest$277 = $$2;
            let tmpIfTest$279 = $$3;
            let tmpIfTest$281 = $$4;
            let tmpIfTest$283 = $$5;
            let tmpIfTest$285 = $$6;
            debugger;
            const tmpReturnArg$81 = tmpBranchingC$19(
              tmpSwitchValue$63,
              tmpSwitchCaseToStart$63,
              tmpIfTest$277,
              tmpIfTest$279,
              tmpIfTest$281,
              tmpIfTest$283,
              tmpIfTest$285,
            );
            return tmpReturnArg$81;
          };
          const tmpBranchingC$19 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
            let tmpSwitchValue$65 = $$0;
            let tmpSwitchCaseToStart$65 = $$1;
            let tmpIfTest$287 = $$2;
            let tmpIfTest$289 = $$3;
            let tmpIfTest$291 = $$4;
            let tmpIfTest$293 = $$5;
            let tmpIfTest$295 = $$6;
            debugger;
            const tmpReturnArg$83 = tmpBranchingC$17(
              tmpSwitchValue$65,
              tmpSwitchCaseToStart$65,
              tmpIfTest$287,
              tmpIfTest$289,
              tmpIfTest$291,
              tmpIfTest$293,
            );
            return tmpReturnArg$83;
          };
          if (tmpIfTest$257) {
            const tmpReturnArg$85 = tmpBranchingA$19(
              tmpSwitchValue$57,
              tmpSwitchCaseToStart$57,
              tmpIfTest$249,
              tmpIfTest$251,
              tmpIfTest$253,
              tmpIfTest$255,
              tmpIfTest$257,
            );
            return tmpReturnArg$85;
          } else {
            const tmpReturnArg$87 = tmpBranchingB$19(
              tmpSwitchValue$57,
              tmpSwitchCaseToStart$57,
              tmpIfTest$249,
              tmpIfTest$251,
              tmpIfTest$253,
              tmpIfTest$255,
              tmpIfTest$257,
            );
            return tmpReturnArg$87;
          }
        };
        const tmpBranchingC$17 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
          let tmpSwitchValue$59 = $$0;
          let tmpSwitchCaseToStart$59 = $$1;
          let tmpIfTest$259 = $$2;
          let tmpIfTest$261 = $$3;
          let tmpIfTest$263 = $$4;
          let tmpIfTest$265 = $$5;
          debugger;
          const tmpReturnArg$89 = tmpBranchingC$7(tmpSwitchValue$59, tmpSwitchCaseToStart$59, tmpIfTest$259, tmpIfTest$261);
          return tmpReturnArg$89;
        };
        if (tmpIfTest$141) {
          const tmpReturnArg$91 = tmpBranchingA$17(
            tmpSwitchValue$35,
            tmpSwitchCaseToStart$35,
            tmpIfTest$135,
            tmpIfTest$137,
            tmpIfTest$139,
            tmpIfTest$141,
          );
          return tmpReturnArg$91;
        } else {
          const tmpReturnArg$93 = tmpBranchingB$17(
            tmpSwitchValue$35,
            tmpSwitchCaseToStart$35,
            tmpIfTest$135,
            tmpIfTest$137,
            tmpIfTest$139,
            tmpIfTest$141,
          );
          return tmpReturnArg$93;
        }
      };
      if (tmpIfTest$101) {
        const tmpReturnArg$95 = tmpBranchingA$9(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpIfTest$97, tmpIfTest$99, tmpIfTest$101);
        return tmpReturnArg$95;
      } else {
        const tmpReturnArg$97 = tmpBranchingB$9(tmpSwitchValue$27, tmpSwitchCaseToStart$27, tmpIfTest$97, tmpIfTest$99, tmpIfTest$101);
        return tmpReturnArg$97;
      }
    };
    const tmpBranchingC$7 = function ($$0, $$1, $$2, $$3) {
      let tmpSwitchValue$29 = $$0;
      let tmpSwitchCaseToStart$29 = $$1;
      let tmpIfTest$113 = $$2;
      let tmpIfTest$115 = $$3;
      debugger;
    };
    if (tmpIfTest$79) {
      const tmpReturnArg$99 = tmpBranchingA$7(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$17, tmpIfTest$79);
      return tmpReturnArg$99;
    } else {
      const tmpReturnArg$101 = tmpBranchingB$7(tmpSwitchValue$5, tmpSwitchCaseToStart$5, tmpIfTest$17, tmpIfTest$79);
      return tmpReturnArg$101;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$103 = tmpBranchingA(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
    return tmpReturnArg$103;
  } else {
    const tmpReturnArg$105 = tmpBranchingB(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
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
  const tmpIfTest = 0 === tmpSwitchValue;
  const tmpBranchingB = function ($$0) {
    const tmpSwitchValue$3 = $$0;
    debugger;
    const tmpBinLhs$5 = $(1);
    const tmpIfTest$11 = tmpBinLhs$5 === tmpSwitchValue$3;
    const tmpBranchingB$1 = function ($$0) {
      const tmpSwitchValue$9 = $$0;
      debugger;
      const tmpBinLhs$15 = $(4);
      const tmpIfTest$27 = tmpBinLhs$15 === tmpSwitchValue$9;
      const tmpBranchingB$3 = function ($$0) {
        const tmpSwitchValue$15 = $$0;
        debugger;
        const tmpBinLhs$29 = $(7);
        const tmpIfTest$47 = tmpBinLhs$29 === tmpSwitchValue$15;
        if (tmpIfTest$47) {
          const tmpReturnArg$11 = tmpBranchingC(3);
          return tmpReturnArg$11;
        } else {
          const tmpReturnArg$13 = tmpBranchingC(4);
          return tmpReturnArg$13;
        }
      };
      if (tmpIfTest$27) {
        const tmpReturnArg$17 = tmpBranchingC(2);
        return tmpReturnArg$17;
      } else {
        const tmpReturnArg$19 = tmpBranchingB$3(tmpSwitchValue$9);
        return tmpReturnArg$19;
      }
    };
    if (tmpIfTest$11) {
      const tmpReturnArg$23 = tmpBranchingC(1);
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1(tmpSwitchValue$3);
      return tmpReturnArg$25;
    }
  };
  const tmpBranchingC = function ($$0) {
    const tmpSwitchCaseToStart$5 = $$0;
    debugger;
    const tmpIfTest$79 = tmpSwitchCaseToStart$5 <= 0;
    const tmpBranchingB$7 = function ($$0) {
      const tmpSwitchCaseToStart$27 = $$0;
      debugger;
      const tmpIfTest$101 = tmpSwitchCaseToStart$27 <= 1;
      const tmpBranchingA$9 = function ($$0) {
        const tmpSwitchCaseToStart$31 = $$0;
        debugger;
        const tmpIfTest$123 = $(8);
        const tmpBranchingA$11 = function ($$0) {
          const tmpSwitchCaseToStart$37 = $$0;
          debugger;
          const tmpIfTest$153 = $(9);
          const tmpBranchingB$13 = function ($$0) {
            const tmpSwitchCaseToStart$45 = $$0;
            debugger;
            $(11);
            const tmpIfTest$193 = $(2);
            if (tmpIfTest$193) {
              $(13);
              const tmpReturnArg$55 = tmpBranchingC$11(tmpSwitchCaseToStart$45);
              return tmpReturnArg$55;
            } else {
              const tmpReturnArg$61 = $(14);
              return tmpReturnArg$61;
            }
          };
          if (tmpIfTest$153) {
            const tmpReturnArg$65 = $(10);
            return tmpReturnArg$65;
          } else {
            const tmpReturnArg$67 = tmpBranchingB$13(tmpSwitchCaseToStart$37);
            return tmpReturnArg$67;
          }
        };
        const tmpBranchingC$11 = function ($$0) {
          const tmpSwitchCaseToStart$41 = $$0;
          debugger;
          $(3);
          const tmpReturnArg$71 = tmpBranchingC$9(tmpSwitchCaseToStart$41);
          return tmpReturnArg$71;
        };
        if (tmpIfTest$123) {
          const tmpReturnArg$73 = tmpBranchingA$11(tmpSwitchCaseToStart$31);
          return tmpReturnArg$73;
        } else {
          const tmpReturnArg$75 = tmpBranchingC$11(tmpSwitchCaseToStart$31);
          return tmpReturnArg$75;
        }
      };
      const tmpBranchingC$9 = function ($$0) {
        const tmpSwitchCaseToStart$35 = $$0;
        debugger;
        const tmpIfTest$141 = tmpSwitchCaseToStart$35 <= 2;
        const tmpBranchingB$17 = function ($$0) {
          const tmpSwitchCaseToStart$57 = $$0;
          debugger;
          const tmpIfTest$257 = tmpSwitchCaseToStart$57 <= 3;
          if (tmpIfTest$257) {
            return undefined;
          } else {
            return undefined;
          }
        };
        if (tmpIfTest$141) {
          $(5);
          const tmpReturnArg$79 = $(6);
          return tmpReturnArg$79;
        } else {
          const tmpReturnArg$93 = tmpBranchingB$17(tmpSwitchCaseToStart$35);
          return tmpReturnArg$93;
        }
      };
      if (tmpIfTest$101) {
        const tmpReturnArg$95 = tmpBranchingA$9(tmpSwitchCaseToStart$27);
        return tmpReturnArg$95;
      } else {
        const tmpReturnArg$97 = tmpBranchingC$9(tmpSwitchCaseToStart$27);
        return tmpReturnArg$97;
      }
    };
    if (tmpIfTest$79) {
      $(2);
      return undefined;
    } else {
      const tmpReturnArg$101 = tmpBranchingB$7(tmpSwitchCaseToStart$5);
      return tmpReturnArg$101;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$103 = tmpBranchingC(0);
    return tmpReturnArg$103;
  } else {
    const tmpReturnArg$105 = tmpBranchingB(tmpSwitchValue);
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
