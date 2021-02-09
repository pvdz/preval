# Preval test case

# method_param_default.md

> normalize > class > method_param_default
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
let x = class x {
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
let x = class x {
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

## Result

Should call `$` with:
 - 1: 10, 'default'
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
