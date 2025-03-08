# Preval test case

# global_literal2.md

> Normalize > Nullish > Global literal2
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$(unknown??length);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = unknown;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
if (tmpIfTest) {
  $(length);
} else {
  $(tmpCalleeParam);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = unknown;
if (tmpCalleeParam == null) {
  $(length);
} else {
  $(tmpCalleeParam);
}
`````

## Pre Normal


`````js filename=intro
$(unknown ?? length);
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = unknown;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = unknown;
const b = a == null;
if (b) {
  $( length );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

unknown, length

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
