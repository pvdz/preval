# Preval test case

# global_group_call.md

> Normalize > Nullish > Global group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())??foo
$(y);
`````

## Settled


`````js filename=intro
const y /*:unknown*/ = $();
const tmpIfTest /*:boolean*/ = y == null;
if (tmpIfTest) {
  $(foo);
} else {
  $(y);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $();
if (y == null) {
  $(foo);
} else {
  $(y);
}
`````

## Pre Normal


`````js filename=intro
const y = (1, 2, $()) ?? foo;
$(y);
`````

## Normalized


`````js filename=intro
let y = $();
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
  $(foo);
} else {
  $(y);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  $( foo );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
