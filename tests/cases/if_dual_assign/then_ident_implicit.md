# Preval test case

# then_ident_implicit.md

> If dual assign > Then ident implicit
>
> This case should make sure we don't accidentally set a var to a value it should not be having

## Input

`````js filename=intro
let x = false;
//const b = $('x', 'one');
//const c = $('x', 'one');
const a = b === c;
if (a) {
  x = a; // Can be eliminated. Should not cause x to be set to a.
} else {
}
$(x, 'middle');
if (a) {
  x = true;
} else {
  x = false;
}
$(x, 'end');
`````

## Settled


`````js filename=intro
const a /*:boolean*/ = b === c;
$(a, `middle`);
$(a, `end`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = b === c;
$(a, `middle`);
$(a, `end`);
`````

## Pre Normal


`````js filename=intro
let x = false;
const a = b === c;
if (a) {
  x = a;
} else {
}
$(x, `middle`);
if (a) {
  x = true;
} else {
  x = false;
}
$(x, `end`);
`````

## Normalized


`````js filename=intro
let x = false;
const a = b === c;
if (a) {
  x = a;
} else {
}
$(x, `middle`);
if (a) {
  x = true;
} else {
  x = false;
}
$(x, `end`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = b === c;
$( a, "middle" );
$( a, "end" );
`````

## Globals

BAD@! Found 2 implicit global bindings:

b, c

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
