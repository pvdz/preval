# Preval test case

# method_param_default.md

> Normalize > Class > Method param default
>
> Class with method default should be transformed properly

#TODO

## Input

`````js filename=intro
class x {
  y(arg = $(10, 'default')) {
    return arg;
  }
}

$(new x().y());
`````

## Pre Normal

`````js filename=intro
let x = class {
  y($$0) {
    const tmpParamBare = $$0;
    debugger;
    let arg = tmpParamBare === undefined ? $(10, 'default') : tmpParamBare;
    return arg;
  }
};
$(new x().y());
`````

## Normalized

`````js filename=intro
let x = class {
  y($$0) {
    const tmpParamBare = $$0;
    debugger;
    let arg = undefined;
    const tmpIfTest = tmpParamBare === undefined;
    const tmpBranchingA = function ($$0, $$1, $$2) {
      let tmpParamBare$1 = $$0;
      let arg$1 = $$1;
      let tmpIfTest$1 = $$2;
      debugger;
      arg$1 = $(10, 'default');
      const tmpReturnArg = tmpBranchingC(tmpParamBare$1, arg$1, tmpIfTest$1);
      return tmpReturnArg;
    };
    const tmpBranchingB = function ($$0, $$1, $$2) {
      let tmpParamBare$2 = $$0;
      let arg$2 = $$1;
      let tmpIfTest$2 = $$2;
      debugger;
      arg$2 = tmpParamBare$2;
      const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$2, arg$2, tmpIfTest$2);
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function ($$0, $$1, $$2) {
      let tmpParamBare$3 = $$0;
      let arg$3 = $$1;
      let tmpIfTest$3 = $$2;
      debugger;
      return arg$3;
    };
    if (tmpIfTest) {
      const tmpReturnArg$2 = tmpBranchingA(tmpParamBare, arg, tmpIfTest);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingB(tmpParamBare, arg, tmpIfTest);
      return tmpReturnArg$3;
    }
  }
};
const tmpCallCallee = $;
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.y();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = class {
  y($$0) {
    const tmpParamBare = $$0;
    debugger;
    const tmpIfTest = tmpParamBare === undefined;
    if (tmpIfTest) {
      const SSA_arg$1 = $(10, 'default');
      return SSA_arg$1;
    } else {
      return tmpParamBare;
    }
  }
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.y();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 'default'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
