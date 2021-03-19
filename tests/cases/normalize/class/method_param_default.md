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
  y(tmpParamDefault) {
    let arg = tmpParamDefault === undefined ? $(10, 'default') : tmpParamDefault;
    return arg;
  }
};
$(new x().y());
`````

## Normalized

`````js filename=intro
let x = class {
  y(tmpParamDefault) {
    let arg = undefined;
    const tmpIfTest = tmpParamDefault === undefined;
    const tmpBranchingA = function (tmpParamDefault$1, arg$1, tmpIfTest$1) {
      arg$1 = $(10, 'default');
      const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, arg$1, tmpIfTest$1);
      return tmpReturnArg;
    };
    const tmpBranchingB = function (tmpParamDefault$2, arg$2, tmpIfTest$2) {
      arg$2 = tmpParamDefault$2;
      const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, arg$2, tmpIfTest$2);
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function (tmpParamDefault$3, arg$3, tmpIfTest$3) {
      return arg$3;
    };
    if (tmpIfTest) {
      const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, arg, tmpIfTest);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, arg, tmpIfTest);
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
  y(tmpParamDefault) {
    const tmpIfTest = tmpParamDefault === undefined;
    if (tmpIfTest) {
      const SSA_arg$1 = $(10, 'default');
      return SSA_arg$1;
    } else {
      return tmpParamDefault;
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
