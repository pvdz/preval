# Preval test case

# for_of2.md

> Labels > Continue > For of2
>
> What about for-of/in loops?
> (This case won't even get to the relevant point because the labeled continue
> has its label nuked for being useless. That's why tests require double layer
> loops as the input.)

## Input

`````js filename=intro
let x = {a:0, b: 1};
A: for (const y of x) {
  $('a');
  if ($(true)) {
    continue A;
  }
}
$('c');
`````

## Settled


`````js filename=intro
const x /*:object*/ = { a: 0, b: 1 };
const tmpForOfGen /*:unknown*/ = $forOf(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
    $(`a`);
    $(true);
  }
}
$(`c`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf({ a: 0, b: 1 });
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
    $(`a`);
    $(true);
  }
}
$(`c`);
`````

## Pre Normal


`````js filename=intro
let x = { a: 0, b: 1 };
A: {
  let tmpForOfGen = $forOf(x);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      const y = tmpForOfNext.value;
      {
        $continue: {
          {
            $(`a`);
            if ($(true)) {
              break $continue;
            }
          }
        }
      }
    }
  }
}
$(`c`);
`````

## Normalized


`````js filename=intro
let x = { a: 0, b: 1 };
let tmpForOfGen = $forOf(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const y = tmpForOfNext.value;
    $continue: {
      $(`a`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break $continue;
      } else {
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
    $( "a" );
    $( true );
  }
}
$( "c" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next