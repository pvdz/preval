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

## Pre Normal


`````js filename=intro
let x = { a: 0, b: 1 };
A: for (const y of x) {
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
$(`c`);
`````

## Normalized


`````js filename=intro
let x = { a: 0, b: 1 };
const tmpForOfDeclRhs = x;
let y = undefined;
for (y of tmpForOfDeclRhs) {
  while (true) {
    $(`a`);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    } else {
      $(`fail`);
    }
  }
}
$(`c`);
`````

## Output


`````js filename=intro
let y = undefined;
const x = { a: 0, b: 1 };
for (y of x) {
  $(`a`);
  const tmpIfTest = $(true);
  if (tmpIfTest) {
  } else {
    while ($LOOP_UNROLL_10) {
      $(`fail`);
      $(`a`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  }
}
$(`c`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 0,
  b: 1,
};
for (a of b) {
  $( "a" );
  const c = $( true );
  if (c) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      $( "fail" );
      $( "a" );
      const d = $( true );
      if (d) {
        break;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
