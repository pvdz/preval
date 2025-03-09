# Preval test case

# redundant_label_for_in.md

> Normalize > Continue > Redundant label for in
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: for (const key in $({a: 1, b: 2})) {
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
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key /*:unknown*/ = tmpForInNext.value;
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
const tmpForInGen = $forIn($({ a: 1, b: 2 }));
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    $(`key:`, tmpForInNext.value);
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
  let tmpForInGen = $forIn($({ a: 1, b: 2 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const key = tmpForInNext.value;
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
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key = tmpForInNext.value;
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
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = e.value;
    $( "key:", g );
    const h = $( 1 );
    if (h) {
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
 - 2: { a: '1', b: '2' }
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
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
