# Preval test case

# woops.md

> If bool > Woops
>
>

## Input

`````js filename=intro
let tmp /*:boolean*/ /*ternaryConst*/ = true;
const test /*:unknown*/ = $(false);
if (test) {
} else {
  $(`B`);
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(`D`);
    if (tmp) {
      tmp = false;
    }
    else {
      break;
    }
  }
}
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(false);
if (test) {
} else {
  let tmp /*:boolean*/ = true;
  $(`B`);
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(`D`);
    if (tmp) {
      tmp = false;
    } else {
      break;
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  let tmp = true;
  $(`B`);
  while (true) {
    $(`D`);
    if (tmp) {
      tmp = false;
    } else {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  let b = true;
  $( "B" );
  while ($LOOP_NO_UNROLLS_LEFT) {
    $( "D" );
    if (b) {
      b = false;
    }
    else {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmp = true;
const test = $(false);
if (test) {
} else {
  $(`B`);
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(`D`);
    if (tmp) {
      tmp = false;
    } else {
      break;
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
 - 1: false
 - 2: 'B'
 - 3: 'D'
 - 4: 'D'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
