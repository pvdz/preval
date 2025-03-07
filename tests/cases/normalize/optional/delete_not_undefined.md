# Preval test case

# delete_not_undefined.md

> Normalize > Optional > Delete not undefined
>
> Delete on member expression is special casing. Works with optional chaining.

## Input

`````js filename=intro
let o = $(undefined);
delete o?.x;
`````

## Settled


`````js filename=intro
const o /*:unknown*/ = $(undefined);
const tmpIfTest /*:boolean*/ = o == null;
if (tmpIfTest) {
} else {
  delete o.x;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const o = $(undefined);
if (!(o == null)) {
  delete o.x;
}
`````

## Pre Normal


`````js filename=intro
let o = $(undefined);
delete o?.x;
`````

## Normalized


`````js filename=intro
let o = $(undefined);
const tmpDeleteOpt = o;
const tmpIfTest = tmpDeleteOpt != null;
if (tmpIfTest) {
  delete tmpDeleteOpt.x;
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( undefined );
const b = a == null;
if (b) {

}
else {
  delete a.x;
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
