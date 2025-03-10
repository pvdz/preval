# Preval test case

# SKIP_double_func_with_this.md

> Function > Constructor > SKIP double func with this
>
> This regression threw over using the `tmpThis` name twice

## Input

`````js filename=intro
const a = Function(`return this`);
$(a());
const b = Function(`return this`);
$(b());
`````

## Settled


`````js filename=intro
$(window);
$(window);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(window);
$(window);
`````

## Pre Normal


`````js filename=intro
const a = Function(`return this`);
$(a());
const b = Function(`return this`);
$(b());
`````

## Normalized


`````js filename=intro
const a = function () {
  debugger;
  return window;
};
const tmpCalleeParam = a();
$(tmpCalleeParam);
const b = function () {
  debugger;
  return window;
};
const tmpCalleeParam$1 = b();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( window );
$( window );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not defined ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')
