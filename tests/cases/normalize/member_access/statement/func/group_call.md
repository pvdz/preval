# Preval test case

# group_call.md

> Normalize > Member access > Statement > Func > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  ($(1), $(2), $($)).length;
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
$(2);
const tmpCompObj /*:unknown*/ = $($);
tmpCompObj.length;
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$($).length;
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  ($(1), $(2), $($)).length;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  const tmpCompObj = $($);
  tmpCompObj.length;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
a.length;
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
