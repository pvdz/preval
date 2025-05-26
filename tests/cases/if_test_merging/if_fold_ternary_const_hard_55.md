# Preval test case

# if_fold_ternary_const_hard_55.md

> If test merging > If fold ternary const hard 55
>
> Hard Case 55: NO CHANGE - y set to true in a loop in then; loop may not run

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let N = $(0); // Loop count could be zero

if (x) {
  // x is true, y was false.
  for (let i = 0; i < N; ++i) {
    y = true; // y assignment is conditional on N > 0.
  }
} else {
  // x is false, y was true. Not reassigned.
}

// y's truthiness in `then` path depends on N. Not consistently truthy.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
let N = $(0);
if (x) {
  for (let i = 0; i < N; ++i) {
    y = true;
  }
} else {}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
let y /*:unknown*/ /*ternaryConst*/ = !x;
const N /*:unknown*/ = $(0);
if (x) {
  const tmpIfTest /*:boolean*/ = 0 < N;
  y = tmpIfTest;
  if (tmpIfTest) {
    let tmpClusterSSA_i /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i < N;
      if (tmpIfTest$1) {
        tmpClusterSSA_i = tmpClusterSSA_i + 1;
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
const N = $(0);
if (x) {
  const tmpIfTest = 0 < N;
  y = tmpIfTest;
  if (tmpIfTest) {
    let tmpClusterSSA_i = 1;
    while (true) {
      if (tmpClusterSSA_i < N) {
        tmpClusterSSA_i = tmpClusterSSA_i + 1;
      } else {
        break;
      }
    }
  }
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
const c = $( 0 );
if (a) {
  const d = 0 < c;
  b = d;
  if (d) {
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < c;
      if (f) {
        e = e + 1;
      }
      else {
        break;
      }
    }
  }
}
if (b) {
  $( "THEN" );
}
else {
  $( "ELSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
let N = $(0);
if (x) {
  let i = 0;
  while (true) {
    const tmpIfTest = i < N;
    if (tmpIfTest) {
      y = true;
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 0
 - 3: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
