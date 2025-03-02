# Preval test case

# class.md

> Pcode > Class
>
> This caused a problem at some point.

## Input

`````js filename=intro
const c = function() {
  return class {};
};
$(c)
`````

## Pre Normal


`````js filename=intro
const c = function () {
  debugger;
  return class {};
};
$(c);
`````

## Normalized


`````js filename=intro
const c = function () {
  debugger;
  const tmpReturnArg = class {};
  return tmpReturnArg;
};
$(c);
`````

## Output


`````js filename=intro
const c /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:class*/ = class {};
  return tmpReturnArg;
};
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = class   {

  };
  return b;
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
