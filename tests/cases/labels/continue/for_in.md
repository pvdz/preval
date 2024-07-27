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

## Pre Normal


`````js filename=intro
let x = { a: 0, b: 1 };
A: {
  let tmpForInGen = $forIn(x);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const y = tmpForInNext.value;
      {
        $continue: {
          {
            while (true) {
              $(`a`);
              if ($(true)) {
                break $continue;
              }
              $(`fail`);
            }
            $(`b`);
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
let tmpForInGen = $forIn(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const y = tmpForInNext.value;
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

## Output


`````js filename=intro
const x = { a: 0, b: 1 };
const tmpForInGen = $forIn(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
    $(`a`);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
    } else {
      while ($LOOP_UNROLL_10) {
        $(`fail`);
        $(`a`);
        const tmpIfTest$2 = $(true);
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

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 0,
  b: 1,
};
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: true
 - 3: 'a'
 - 4: true
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
