# Preval test case

# for_test.md

> Unwind loops > Separate test > For test
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
for (test of $({a: 1})) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = counter < 10;
for (test of $({ a: 1 })) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Normalized


`````js filename=intro
let counter = 0;
let test = counter < 10;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
for (test of tmpForOfRhs) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Output


`````js filename=intro
let counter = 0;
let test = true;
const tmpCalleeParam = { a: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
for (test of tmpForOfRhs) {
  $(`yolo`);
  counter = counter + 1;
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
let b = true;
const c = { a: 1 };
const d = $( c );
for (b of d) {
  $( "yolo" );
  a = a + 1;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
