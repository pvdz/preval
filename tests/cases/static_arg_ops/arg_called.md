# Preval test case

# arg_called.md

> Static arg ops > Arg called
>
> Triggering static arg op outlining when calling the arg

## Input

`````js filename=intro
let f = function (func) {
  const a = func(1);
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
  const a = func(1);
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
  const a = func(1);
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
const a = $(1);
if ($) {
  $(a);
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if ($) {
  $( a );
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
