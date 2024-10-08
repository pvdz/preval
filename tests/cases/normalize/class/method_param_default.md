# Preval test case

# method_param_default.md

> Normalize > Class > Method param default
>
> Class with method default should be transformed properly

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
    let arg = tmpParamBare === undefined ? $(10, `default`) : tmpParamBare;
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
    if (tmpIfTest) {
      arg = $(10, `default`);
      return arg;
    } else {
      arg = tmpParamBare;
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
const x /*:class*/ = class {
  y($$0) {
    const tmpParamBare = $$0;
    debugger;
    const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
    if (tmpIfTest) {
      const tmpClusterSSA_arg = $(10, `default`);
      return tmpClusterSSA_arg;
    } else {
      return tmpParamBare;
    }
  }
};
const tmpCallObj /*:object*/ = new x();
const tmpCalleeParam = tmpCallObj.y();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = class   {
y( $$0 ) {
  const b = c;
  debugger;
  const d = b === undefined;
  if (d) {
    const e = $( 10, "default" );
    return e;
  }
  else {
    return b;
  }
}
};
const f = new a();
const g = f.y();
$( g );
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
