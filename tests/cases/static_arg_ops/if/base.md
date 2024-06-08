# Preval test case

# base.md

> Static arg ops > If > Base

## Input

`````js filename=intro
const f = function (c) {
  if (c) {
    $(undefined);
    const x = [c];
    return x;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f($);
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let c = $$0;
  debugger;
  if (c) {
    $(undefined);
    const x = [c];
    return x;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f($);
$(tmpCalleeParam);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let c = $$0;
  debugger;
  if (c) {
    $(undefined);
    const x = [c];
    return x;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f($);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
if ($) {
  const x = [$];
  $(x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
if ($) {
  const a = [ $ ];
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: ['<$>']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
