# Preval test case

# for_in.md

> Labels > Continue > For in
>
> What about for-of/in loops?

#TODO

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
for (y in x) {
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
  b: 1,
};
for (a in b) {
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
 - 1: 'a'
 - 2: true
 - 3: 'a'
 - 4: true
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
