# Preval test case

# non_true.md

> Normalize > While > Simplify norm > Non true
>
> Try to undo some of the damage that was necessary during loop normalizations

## Input

`````js filename=intro
while (x) {
  const tmpIfTest = $('yes');
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````


## Settled


`````js filename=intro
if (x) {
  const tmpIfTest /*:unknown*/ = $(`yes`);
  if (tmpIfTest) {
    while ($LOOP_UNROLL_10) {
      if (x) {
        const tmpIfTest$1 /*:unknown*/ = $(`yes`);
        if (tmpIfTest$1) {
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x) {
  if ($(`yes`)) {
    while (true) {
      if (x) {
        if (!$(`yes`)) {
          break;
        }
      } else {
        break;
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (x) {
  const a = $( "yes" );
  if (a) {
    while ($LOOP_UNROLL_10) {
      if (x) {
        const b = $( "yes" );
        if (b) {

        }
        else {
          break;
        }
      }
      else {
        break;
      }
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  if (x) {
    const tmpIfTest = $(`yes`);
    if (tmpIfTest) {
    } else {
      break;
    }
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
