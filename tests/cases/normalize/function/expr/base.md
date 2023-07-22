# Preval test case

# base.md

> Normalize > Function > Expr > Base
>
> a func expr is slightly different from func expr

#TODO

## Input

`````js filename=intro
const f = function g() {};
$(f);
`````

## Pre Normal

`````js filename=intro
const f = function g() {
  debugger;
};
$(f);
`````

## Normalized

`````js filename=intro
const g = function () {
  debugger;
  return undefined;
};
const f = g;
$(f);
`````

## Output

`````js filename=intro
const g = function () {
  debugger;
  return undefined;
};
$(g);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
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
