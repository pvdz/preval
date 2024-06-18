# Preval test case

# create_func_dotcall_constructor.md

> Function > Constructor > Create func dotcall constructor
>
> Creating a function and calling it...

The system knows `func.constructor` maps to `Function` and should be able to deal with this

## Input

`````js filename=intro
const f = (function(){}).constructor(a, b, c, d);
$(f());
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
}.constructor(a, b, c, d);
$(f());
`````

## Normalized


`````js filename=intro
const tmpCallObj = function () {
  debugger;
  return undefined;
};
const f = tmpCallObj.constructor(a, b, c, d);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = Function(a, b, c, d);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = Function( a, b, c, d );
const b = a();
$( b );
`````

## Globals

BAD@! Found 4 implicit global bindings:

a, b, c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
