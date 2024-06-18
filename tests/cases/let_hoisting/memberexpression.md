# Preval test case

# memberexpression.md

> Let hoisting > Memberexpression
>
> Member expression was causing problems

## Input

`````js filename=intro
let f = function () {
  if ($) {
    a = $;
    return undefined;
  }
};
let b = $;
let a = b.a;

`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    a = $;
    return undefined;
  }
};
let b = $;
let a = b.a;
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    a = $;
    return undefined;
  } else {
    return undefined;
  }
};
let b = $;
let a = b.a;
`````

## Output


`````js filename=intro
$.a;
`````

## PST Output

With rename=true

`````js filename=intro
$.a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
