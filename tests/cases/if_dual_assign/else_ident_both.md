# Preval test case

# else_ident_both.md

> If dual assign > Else ident both
>
> This case should make sure we don't accidentally set a var to a value it should not be having

## Input

`````js filename=intro
let x = false;
const b = $('x', 'one');
const c = $('x', 'one');
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
const b /*:unknown*/ = $(`x`, `one`);
const c /*:unknown*/ = $(`x`, `one`);
$(false, `middle`);
const tmpBool$1 /*:boolean*/ = b === c;
$(tmpBool$1, `end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(`x`, `one`);
const c = $(`x`, `one`);
$(false, `middle`);
$(b === c, `end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x", "one" );
const b = $( "x", "one" );
$( false, "middle" );
const c = a === b;
$( c, "end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = false;
const b = $(`x`, `one`);
const c = $(`x`, `one`);
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


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', 'one'
 - 2: 'x', 'one'
 - 3: false, 'middle'
 - 4: true, 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
