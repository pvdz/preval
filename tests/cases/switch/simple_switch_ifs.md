# Preval test case

# simple_switch_ifs.md

> Switch > Simple switch ifs

Straightforward switches should have a better transform.

The generic transform makes for bad logic. We must suport it but we can have
a happier path for switches that don't fall-through and have a default in the
last position, or none at all. Not this dual if-else crap.

## Input

`````js filename=intro
function f() {
  const x = typeof $('x');
  switch (x) {
    case 'string': if (x) return 0; else return 1;
    case 'number': return 2;
    case 'boolean': return 3;
    default: return 4;
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(`x`);
const x /*:string*/ = typeof tmpUnaryArg;
const tmpIfTest /*:boolean*/ = x === `string`;
if (tmpIfTest) {
  $(0);
} else {
  const tmpIfTest$1 /*:boolean*/ = x === `number`;
  if (tmpIfTest$1) {
    $(2);
  } else {
    const tmpIfTest$3 /*:boolean*/ = x === `boolean`;
    if (tmpIfTest$3) {
      $(3);
    } else {
      $(4);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(`x`);
const x = typeof tmpUnaryArg;
if (x === `string`) {
  $(0);
} else {
  if (x === `number`) {
    $(2);
  } else {
    if (x === `boolean`) {
      $(3);
    } else {
      $(4);
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
  $( 0 );
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
      $( 4 );
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
