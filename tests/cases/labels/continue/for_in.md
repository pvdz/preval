# Preval test case

# for_in.md

> Labels > Continue > For in
>
> What about for-of/in loops?

## Input

`````js filename=intro
let x = {a:0, b: 1};
A: for (const y in x) {
  while (true) {
    $('a');
    if ($(true)) {
      continue A;
    }
    $('fail'); // unreachable
  }
  $('b'); // 2x
}
$('c');
`````


## Settled


`````js filename=intro
const x /*:object*/ = { a: 0, b: 1 };
const tmpForInGen /*:unknown*/ = $forIn(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
    $(`a`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      while ($LOOP_UNROLL_10) {
        $(`fail`);
        $(`a`);
        const tmpIfTest$2 /*:unknown*/ = $(true);
        if (tmpIfTest$2) {
          break;
        } else {
        }
      }
    }
  }
}
$(`c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ a: 0, b: 1 });
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
    $(`a`);
    if (!$(true)) {
      while (true) {
        $(`fail`);
        $(`a`);
        if ($(true)) {
          break;
        }
      }
    }
  }
}
$(`c`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 0,
  b: 1,
};
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
    $( "a" );
    const e = $( true );
    if (e) {

    }
    else {
      while ($LOOP_UNROLL_10) {
        $( "fail" );
        $( "a" );
        const f = $( true );
        if (f) {
          break;
        }
      }
    }
  }
}
$( "c" );
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: true
 - 3: 'a'
 - 4: true
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
