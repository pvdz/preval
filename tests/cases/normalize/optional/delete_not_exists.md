# Preval test case

# delete_not_exists.md

> Normalize > Optional > Delete not exists
>
> Delete on member expression is special casing. Works with optional chaining.

## Input

`````js filename=intro
let o = {};
$(o);
delete o?.x;
$(o);
`````

## Settled


`````js filename=intro
const o /*:object*/ = {};
$(o);
delete o.x;
$(o);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const o = {};
$(o);
delete o.x;
$(o);
`````

## Pre Normal


`````js filename=intro
let o = {};
$(o);
delete o?.x;
$(o);
`````

## Normalized


`````js filename=intro
let o = {};
$(o);
const tmpDeleteOpt = o;
const tmpIfTest = tmpDeleteOpt != null;
if (tmpIfTest) {
  delete tmpDeleteOpt.x;
  $(o);
} else {
  $(o);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
delete a.x;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
