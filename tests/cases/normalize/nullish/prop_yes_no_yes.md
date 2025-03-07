# Preval test case

# prop_yes_no_yes.md

> Normalize > Nullish > Prop yes no yes
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a??b.c??d);
`````

## Settled


`````js filename=intro
const a /*:object*/ = {};
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a ?? b.c ?? d);
`````

## Normalized


`````js filename=intro
const a = {};
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = b.c;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = d;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
