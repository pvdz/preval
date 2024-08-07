# Preval test case

# base_undefined.md

> Type tracked > If > Base undefined
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
function f(x) {
  if (x) {
    $('false');
  } else {
    $('pass');
  }
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    $(`false`);
  } else {
    $(`pass`);
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    $(`false`);
    return undefined;
  } else {
    $(`pass`);
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
$inlinedFunction: {
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
$inlinedFunction: {
  $( "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
