# Preval test case

# catch_throw.md

> Tests > Tofix > Catch throw
>
> In particular, the catch ~~ else pattern can be simplified
> - When a catch has the boilerplate `x = true; y = e;` and the catch is 
>   followed by a `if (x) throw y` then I'm not sure what might not be
>   equal to `catch(e) { throw e }`
> - After that, `try { f() } catch (e) { throw e }` seems like a redundant
>   catch and the try can be eliminated? Maybe we already do that.
> Ultimately this func should collapse into a trampo of calling the eventHandler
> 
> Something to investigate: why is the first argument stuff eliminated in 
> this func in react 18 source? the func escapes, the arg is relevant?

## Input

`````js filename=intro
const unstable_runWithPriority = function(eventHandler) {
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  let value = undefined;
  try {
    value = eventHandler();
  } catch ($finalImplicit$11) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit$11;
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return value;
  }
};
$(unstable_runWithPriority);
`````

## Pre Normal


`````js filename=intro
const unstable_runWithPriority = function ($$0) {
  let eventHandler = $$0;
  debugger;
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  let value = undefined;
  try {
    value = eventHandler();
  } catch ($finalImplicit$11) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit$11;
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return value;
  }
};
$(unstable_runWithPriority);
`````

## Normalized


`````js filename=intro
const unstable_runWithPriority = function ($$0) {
  let eventHandler = $$0;
  debugger;
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  let value = undefined;
  try {
    value = eventHandler();
  } catch ($finalImplicit$11) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit$11;
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return value;
  }
};
$(unstable_runWithPriority);
`````

## Output


`````js filename=intro
const unstable_runWithPriority /*:(unknown)=>?*/ = function ($$0) {
  const eventHandler = $$0;
  debugger;
  let $implicitThrow /*:boolean*/ = false;
  let $finalCatchArg = undefined;
  let value = undefined;
  try {
    value = eventHandler();
  } catch ($finalImplicit$11) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit$11;
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return value;
  }
};
$(unstable_runWithPriority);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  let c = false;
  let d = undefined;
  let e = undefined;
  try {
    e = b();
  }
  catch (f) {
    c = true;
    d = f;
  }
  if (c) {
    throw d;
  }
  else {
    return e;
  }
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
