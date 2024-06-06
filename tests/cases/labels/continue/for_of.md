# Preval test case

# for_of.md

> Labels > Continue > For of
>
> What about for-of/in loops?

#TODO

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
  $continue: {
    while (true) {
      $(`a`);
      const tmpIfTest = $(true);
      if (tmpIfTest) {
        break $continue;
      } else {
        $(`fail`);
      }
    }
    $(`b`);
  }
}
$(`c`);
`````

## Output


`````js filename=intro
let y = undefined;
const x = { a: 0, b: 1 };
for (y of x) {
  $continue: {
    while (true) {
      $(`a`);
      const tmpIfTest = $(true);
      if (tmpIfTest) {
        break $continue;
      } else {
        $(`fail`);
      }
    }
    $(`b`);
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
b: 1
;
for (a of b) {
  $continue:   {
    while (true) {
      $( "a" );
      const c = $( true );
      if (c) {
        break $continue;
      }
      else {
        $( "fail" );
      }
    }
    $( "b" );
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
