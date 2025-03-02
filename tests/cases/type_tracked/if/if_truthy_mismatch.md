# Preval test case

# if_truthy_mismatch.md

> Type tracked > If > If truthy mismatch
>
> This caused a crash in type_tracked tricks because the param of g was
> marked as being an array when it wasn't necessarily.

## Input

`````js filename=intro
const f = function() {
  const arr = [ $ ];
  const m = g(arr);
  $(m);
  const n = g($);
  $(n);
  return undefined;
};
const g = function(x) {
  if (x) {
    return $;
  } else {
    return undefined;
  }
};
$(f);

`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  const arr = [$];
  const m = g(arr);
  $(m);
  const n = g($);
  $(n);
  return undefined;
};
const g = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    return $;
  } else {
    return undefined;
  }
};
$(f);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  const arr = [$];
  const m = g(arr);
  $(m);
  const n = g($);
  $(n);
  return undefined;
};
const g = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    return $;
  } else {
    return undefined;
  }
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $($);
  if ($) {
    $($);
    return undefined;
  } else {
    $(undefined);
    return undefined;
  }
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( $ );
  if ($) {
    $( $ );
    return undefined;
  }
  else {
    $( undefined );
    return undefined;
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
