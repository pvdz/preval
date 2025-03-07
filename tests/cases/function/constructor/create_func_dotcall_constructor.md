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

## Settled


`````js filename=intro
const f /*:function*/ = Function(a, b, c, d);
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = Function(a, b, c, d);
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
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const e = Function( a, b, c, d );
const f = e();
$( f );
`````

## Globals

BAD@! Found 4 implicit global bindings:

a, b, c, d

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
