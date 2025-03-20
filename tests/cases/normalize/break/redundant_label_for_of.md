# Preval test case

# redundant_label_for_of.md

> Normalize > Break > Redundant label for of
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
    break exit;
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
      break;
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
    if (x) {
      break;
    } else {
      x = $(4);
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
      break;
    }
    else {
      a = $( 4 );
    }
  }
}
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: {}
 - 3: 'key:', 'a'
 - 4: 1
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
