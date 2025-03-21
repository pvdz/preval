# Preval test case

# redundant_label_for_of.md

> Normalize > Continue > Redundant label for of
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: for (const key of $(new Set(['a', 'b']))) {
  $('key:', key);
  
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    continue exit;
  } else {
    x = $(4);
  }
}
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(2);
const tmpCalleeParam$3 /*:array*/ = [`a`, `b`];
const tmpCalleeParam$1 /*:object*/ = new Set(tmpCalleeParam$3);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key /*:unknown*/ = tmpForOfNext.value;
    $(`key:`, key);
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      x = $(3);
    } else {
    }
    if (x) {
    } else {
      x = $(4);
    }
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(2);
const tmpCalleeParam$3 = [`a`, `b`];
const tmpForOfGen = $forOf($(new Set(tmpCalleeParam$3)));
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    $(`key:`, tmpForOfNext.value);
    if ($(1)) {
      x = $(3);
    }
    if (!x) {
      x = $(4);
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(2);
exit: {
  let tmpForOfGen = $forOf($(new Set([`a`, `b`])));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      const key = tmpForOfNext.value;
      {
        $continue: {
          {
            $(`key:`, key);
            if ($(1)) {
              x = $(3);
            }
            if (x) {
              break $continue;
            } else {
              x = $(4);
            }
          }
        }
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
let x = $(2);
const tmpNewCallee = Set;
const tmpCalleeParam$3 = [`a`, `b`];
const tmpCalleeParam$1 = new tmpNewCallee(tmpCalleeParam$3);
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key = tmpForOfNext.value;
    $continue: {
      $(`key:`, key);
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        x = $(3);
      } else {
      }
      if (x) {
        break $continue;
      } else {
        x = $(4);
      }
    }
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
const b = [ "a", "b" ];
const c = new Set( b );
const d = $( c );
const e = $forOf( d );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = f.value;
    $( "key:", h );
    const i = $( 1 );
    if (i) {
      a = $( 3 );
    }
    if (a) {

    }
    else {
      a = $( 4 );
    }
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: {}
 - 3: 'key:', 'a'
 - 4: 1
 - 5: 3
 - 6: 'key:', 'b'
 - 7: 1
 - 8: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
