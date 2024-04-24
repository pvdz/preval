# Preval test case

# cond_early_read_in_loop.md

> Ssa > Cond early read in loop
>
> Early read in loop can skirt TDZ when conditional

#TODO

## Input

`````js filename=intro
let lhs = undefined;
for (lhs in rhs) {
  if ($) {
    const rhs = [firstElement];
    $(rhs);
  } else {
    $('init');
  }
  let firstElement = undefined;
}
`````

## Pre Normal

`````js filename=intro
let lhs = undefined;
for (lhs in rhs) {
  if ($) {
    const rhs$1 = [$throwTDZError(`TDZ triggered for this read: [firstElement]`)];
    $(rhs$1);
  } else {
    $(`init`);
  }
  let firstElement = undefined;
}
`````

## Normalized

`````js filename=intro
let lhs = undefined;
for (lhs in rhs) {
  if ($) {
    const tmpArrElement = $throwTDZError(`TDZ triggered for this read: [firstElement]`);
    const rhs$1 = [tmpArrElement];
    $(rhs$1);
  } else {
    $(`init`);
  }
  let firstElement = undefined;
}
`````

## Output

`````js filename=intro
let lhs = undefined;
for (lhs in rhs) {
  if ($) {
    const tmpArrElement = $throwTDZError(`TDZ triggered for this read: [firstElement]`);
    const rhs$1 = [tmpArrElement];
    $(rhs$1);
  } else {
    $(`init`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a in rhs) {
  if ($) {
    const b = c( "TDZ triggered for this read: [firstElement]" );
    const d = [ b,, ];
    $( d );
  }
  else {
    $( "init" );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

rhs

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
