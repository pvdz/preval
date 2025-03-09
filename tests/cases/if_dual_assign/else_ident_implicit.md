# Preval test case

# else_ident_implicit.md

> If dual assign > Else ident implicit
>
> This case should make sure we don't accidentally set a var to a value it should not be having

The current bug is caused by moving the ident upward, causing the call to $ to appear before the implicit globals that don't exist.

## Input

`````js filename=intro
let x = false;
//const b = $('x', 'one');
//const c = $('x', 'one');
const a = b === c;
if (a) {
} else {
  x = a; // Can be eliminated. Should not cause x to be set to a.
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
$(false, `middle`);
$(a, `end`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = b === c;
$(false, `middle`);
$(a, `end`);
`````

## Pre Normal


`````js filename=intro
let x = false;
const a = b === c;
if (a) {
} else {
  x = a;
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
  $(x, `middle`);
} else {
  x = a;
  $(a, `middle`);
}
if (a) {
  x = true;
  $(x, `end`);
} else {
  x = false;
  $(x, `end`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = b === c;
$( false, "middle" );
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
