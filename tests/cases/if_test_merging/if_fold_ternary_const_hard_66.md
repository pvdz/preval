# Preval test case

# if_fold_ternary_const_hard_66.md

> If test merging > If fold ternary const hard 66
>
> Hard Case 66: NO CHANGE - controlIf is inside a while loop, targetIf is after

## Input

`````js filename=intro
let x = $(true);
let y = !x;
let cond = $(true);

while(cond){
  if (x) { // This controlIf is nested
    y = true;
  }
  cond = $(false); // Loop runs once
}

// targetIfNode is here. Walker gets path to it.
// Search for controlIf in parentNode[parentProp] (e.g. Program.body)
// Will not find the nested controlIf.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
let cond = $(true);
while(cond){
  if (x) {
    y = true;
  }
  cond = $(false);
}
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
let y /*:boolean*/ = !x;
const cond /*:unknown*/ = $(true);
if (cond) {
  if (x) {
    y = true;
  } else {
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpClusterSSA_cond /*:unknown*/ = $(false);
    if (tmpClusterSSA_cond) {
      if (x) {
        y = true;
      } else {
      }
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
if ($(true)) {
  if (x) {
    y = true;
  }
  while (true) {
    if ($(false)) {
      if (x) {
        y = true;
      }
    } else {
      break;
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
const c = $( true );
if (c) {
  if (a) {
    b = true;
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const d = $( false );
    if (d) {
      if (a) {
        b = true;
      }
    }
    else {
      break;
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
let cond = $(true);
while (true) {
  if (cond) {
    if (x) {
      y = true;
    } else {
    }
    cond = $(false);
  } else {
    break;
  }
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
 - 2: true
 - 3: false
 - 4: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
