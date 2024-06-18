# Preval test case

# global_truthy.md

> Type tracked > Invert > Global truthy
>
> Inverting a value that we know is a falsy value must return true

## Input

`````js filename=intro
function f() {
  if ($) {
    $(!$, 'fail');
  } else {
    $(!$, 'pass');
  }
}
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(!$, `fail`);
  } else {
    $(!$, `pass`);
  }
};
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const tmpCallCallee = $;
    const tmpCalleeParam = !$;
    const tmpCalleeParam$1 = `fail`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    return undefined;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = !$;
    const tmpCalleeParam$5 = `pass`;
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
    return undefined;
  }
};
f();
f();
f();
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = !$;
  if ($) {
    $(tmpCalleeParam, `fail`);
    return undefined;
  } else {
    $(tmpCalleeParam, `pass`);
    return undefined;
  }
};
f();
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = !$;
  if ($) {
    $( b, "fail" );
    return undefined;
  }
  else {
    $( b, "pass" );
    return undefined;
  }
};
a();
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'fail'
 - 2: false, 'fail'
 - 3: false, 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
