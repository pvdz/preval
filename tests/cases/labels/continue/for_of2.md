# Preval test case

# for_of2.md

> Labels > Continue > For of2
>
> What about for-of/in loops?
> (This case won't even get to the relevant point because the labeled continue
> has its label nuked for being useless. That's why tests require double layer
> loops as the input.)

#TODO

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

## Pre Normal


`````js filename=intro
let x = { a: 0, b: 1 };
A: for (const y of x) {
  $continue: {
    {
      $(`a`);
      if ($(true)) {
        break $continue;
      }
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
    $(`a`);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break $continue;
    } else {
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
  $(true);
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
  $( true );
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
