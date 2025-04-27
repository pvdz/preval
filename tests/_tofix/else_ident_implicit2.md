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


## PST Settled
With rename=true

`````js filename=intro
const a = b === c;
$( false, "middle" );
$( a, "end" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
