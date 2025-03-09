# Preval test case

# else_ident_implicit2.md

> Tofix > else ident implicit2
>
> This case should make sure we don't accidentally set a var to a value it should not be having

The current bug is caused by moving the ident upward, causing the call to $ to appear
before the implicit globals that don't exist.
See the spylessVars transform
The fix is probably to leave implicit global references behind as statements, to trigger reference errors, at the risk of bloat.

## Input

`````js filename=intro
const a = b === c;
$(false, `middle`);
if (a) {
  $(true, `end`);
} else {
  $(false, `end`);
}
`````

## Settled


`````js filename=intro
$(false, `middle`);
const a /*:boolean*/ = b === c;
$(a, `end`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false, `middle`);
$(b === c, `end`);
`````

## Pre Normal


`````js filename=intro
const a = b === c;
$(false, `middle`);
if (a) {
  $(true, `end`);
} else {
  $(false, `end`);
}
`````

## Normalized


`````js filename=intro
const a = b === c;
$(false, `middle`);
if (a) {
  $(true, `end`);
} else {
  $(false, `end`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( false, "middle" );
const a = b === c;
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

Post settled calls: BAD!!
 - 1: false, 'middle'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - 1: false, 'middle'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Todos triggered:
- switch me to ref tracking
