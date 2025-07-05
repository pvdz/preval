# Preval test case

# for_of.md

> Labels > Continue > For of
>
> What about for-of/in loops?

## Input

`````js filename=intro
let x = {a:0, b: 1};
A: for (const y of x) {
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
const x /*:object*/ /*truthy*/ = { a: 0, b: 1 };
const tmpForOfGenNext /*:unknown*/ = $forOf(x);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
    $(`a`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      while ($LOOP_UNROLLS_LEFT_10) {
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
const tmpForOfGenNext = $forOf({ a: 0, b: 1 });
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
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
const b = $forOf( a );
while ($LOOP_NO_UNROLLS_LEFT) {
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
      while ($LOOP_UNROLLS_LEFT_10) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = { a: 0, b: 1 };
const tmpForOfGenNext = $forOf(x);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const y = tmpForOfNext.value;
    while (true) {
      $(`a`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
        $(`fail`);
      }
    }
  }
}
$(`c`);
`````


## Todos triggered


- (todo) do we want to support MemberExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
