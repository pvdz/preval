# Preval test case

# call_with_arg_as_arg.md

> Static arg ops > Call with arg as arg
>
> Triggering static arg op outlining when passing the arg in a call

## Input

`````js filename=intro
let f = function (func) {
  const a = $(func);
  if ($) {
    return a;
  }
};
$(f($));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let func = $$0;
  debugger;
  const a = $(func);
  if ($) {
    return a;
  }
};
$(f($));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let func = $$0;
  debugger;
  const a = $(func);
  if ($) {
    return a;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f($);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const func = $$0;
  debugger;
  const a = $(func);
  if ($) {
    return a;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f($);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = $( b );
  if ($) {
    return d;
  }
  else {
    return undefined;
  }
};
const e = a( $ );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
