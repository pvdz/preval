# Preval test case

# decl_after.md

> Normalize > Dce > Continue > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  continue;
  
  let x = $('fail');
}
$('after, wont eval due to infinite loop');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        const tmpIfTest$4 /*:unknown*/ = $(false);
        if (tmpIfTest$4) {
          $(`fail too`);
          throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
        } else {
        }
      } else {
        break;
      }
    }
    $(`after, wont eval due to infinite loop`);
  }
} else {
  $(`after, wont eval due to infinite loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  if ($(false)) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    while (true) {
      if ($(true)) {
        if ($(false)) {
          $(`fail too`);
          throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
        }
      } else {
        break;
      }
    }
    $(`after, wont eval due to infinite loop`);
  }
} else {
  $(`after, wont eval due to infinite loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( false );
  if (b) {
    $( "fail too" );
    throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
  }
  else {
    while ($LOOP_UNROLL_10) {
      const c = $( true );
      if (c) {
        const d = $( false );
        if (d) {
          $( "fail too" );
          throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
        }
      }
      else {
        break;
      }
    }
    $( "after, wont eval due to infinite loop" );
  }
}
else {
  $( "after, wont eval due to infinite loop" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: false
 - 5: true
 - 6: false
 - 7: true
 - 8: false
 - 9: true
 - 10: false
 - 11: true
 - 12: false
 - 13: true
 - 14: false
 - 15: true
 - 16: false
 - 17: true
 - 18: false
 - 19: true
 - 20: false
 - 21: true
 - 22: false
 - 23: true
 - 24: false
 - 25: true
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
