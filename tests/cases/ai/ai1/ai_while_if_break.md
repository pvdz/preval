# Preval test case

# ai_while_if_break.md

> Ai > Ai1 > Ai while if break
>
> Test: Conditional break inside a while loop with opaque conditions.

## Input

`````js filename=intro
// Expected (approximate): let L = $('L'); while (L) { $('S1'); let C = $('C'); if (C) { $('S2'); break; } $('S3'); L = $('L'); } $('S4');
while ($('L')) {
  $('S1');
  if ($('C')) {
    $('S2');
    break;
  }
  $('S3');
}
$('S4');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`L`);
if (tmpIfTest) {
  $(`S1`);
  const tmpIfTest$1 /*:unknown*/ = $(`C`);
  if (tmpIfTest$1) {
    $(`S2`);
    $(`S4`);
  } else {
    $(`S3`);
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpIfTest$2 /*:unknown*/ = $(`L`);
      if (tmpIfTest$2) {
        $(`S1`);
        const tmpIfTest$4 /*:unknown*/ = $(`C`);
        if (tmpIfTest$4) {
          $(`S2`);
          break;
        } else {
          $(`S3`);
        }
      } else {
        break;
      }
    }
    $(`S4`);
  }
} else {
  $(`S4`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`L`)) {
  $(`S1`);
  if ($(`C`)) {
    $(`S2`);
    $(`S4`);
  } else {
    $(`S3`);
    while (true) {
      if ($(`L`)) {
        $(`S1`);
        if ($(`C`)) {
          $(`S2`);
          break;
        } else {
          $(`S3`);
        }
      } else {
        break;
      }
    }
    $(`S4`);
  }
} else {
  $(`S4`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "L" );
if (a) {
  $( "S1" );
  const b = $( "C" );
  if (b) {
    $( "S2" );
    $( "S4" );
  }
  else {
    $( "S3" );
    while ($LOOP_UNROLLS_LEFT_10) {
      const c = $( "L" );
      if (c) {
        $( "S1" );
        const d = $( "C" );
        if (d) {
          $( "S2" );
          break;
        }
        else {
          $( "S3" );
        }
      }
      else {
        break;
      }
    }
    $( "S4" );
  }
}
else {
  $( "S4" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(`L`);
  if (tmpIfTest) {
    $(`S1`);
    const tmpIfTest$1 = $(`C`);
    if (tmpIfTest$1) {
      $(`S2`);
      break;
    } else {
      $(`S3`);
    }
  } else {
    break;
  }
}
$(`S4`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'L'
 - 2: 'S1'
 - 3: 'C'
 - 4: 'S2'
 - 5: 'S4'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
