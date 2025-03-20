# Preval test case

# simple_switch_no_def.md

> Switch > Simple switch no def

Straightforward switches should have a better transform.

The generic transform makes for bad logic. We must suport it but we can have
a happier path for switches that don't fall-through and have a default in the
last position, or none at all. Not this dual if-else crap.

## Input

`````js filename=intro
function f() {
  switch (typeof $('x')) {
    case 'string': return 1;
    case 'number': return 2;
    case 'boolean': return 3;
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(`x`);
const tmpSwitchDisc /*:string*/ = typeof tmpUnaryArg;
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === `string`;
if (tmpIfTest) {
  $(1);
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === `number`;
  if (tmpIfTest$1) {
    $(2);
  } else {
    const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === `boolean`;
    if (tmpIfTest$3) {
      $(3);
    } else {
      $(undefined);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(`x`);
const tmpSwitchDisc = typeof tmpUnaryArg;
if (tmpSwitchDisc === `string`) {
  $(1);
} else {
  if (tmpSwitchDisc === `number`) {
    $(2);
  } else {
    if (tmpSwitchDisc === `boolean`) {
      $(3);
    } else {
      $(undefined);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = typeof a;
const c = b === "string";
if (c) {
  $( 1 );
}
else {
  const d = b === "number";
  if (d) {
    $( 2 );
  }
  else {
    const e = b === "boolean";
    if (e) {
      $( 3 );
    }
    else {
      $( undefined );
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
