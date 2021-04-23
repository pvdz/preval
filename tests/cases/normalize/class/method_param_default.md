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
    const tmpBranchingA = function () {
      debugger;
      arg = $(10, 'default');
      const tmpReturnArg = tmpBranchingC();
      return tmpReturnArg;
    };
    const tmpBranchingB = function () {
      debugger;
      arg = tmpParamBare;
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function () {
      debugger;
      return arg;
    };
    if (tmpIfTest) {
      const tmpReturnArg$3 = tmpBranchingA();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB();
      return tmpReturnArg$5;
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
      const tmpssa2_arg = $(10, 'default');
      return tmpssa2_arg;
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
