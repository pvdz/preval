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

## Normalized

`````js filename=intro
let x = class {
  y($tdz$__arg) {
    let arg = undefined;
    const tmpIfTest = $tdz$__arg === undefined;
    if (tmpIfTest) {
      arg = $(10, 'default');
    } else {
      arg = $tdz$__arg;
    }
    return arg;
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
  y($tdz$__arg) {
    let arg = undefined;
    const tmpIfTest = $tdz$__arg === undefined;
    if (tmpIfTest) {
      arg = $(10, 'default');
    } else {
      arg = $tdz$__arg;
    }
    return arg;
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

Normalized calls: Same

Final output calls: Same
