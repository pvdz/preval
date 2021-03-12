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
    if (tmpIfTest) {
      arg = $(10, 'default');
      return arg;
    } else {
      arg = tmpParamDefault;
      return arg;
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
      const SSA_arg = $(10, 'default');
      return SSA_arg;
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
