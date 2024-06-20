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
A: for (const y in x) {
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
const tmpForInDeclRhs = x;
let y = undefined;
for (y in tmpForInDeclRhs) {
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
for (y in x) {
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
for (a in b) {
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
 - 1: 'a'
 - 2: true
 - 3: 'a'
 - 4: true
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
