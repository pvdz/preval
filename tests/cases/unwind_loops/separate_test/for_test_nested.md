# Preval test case

# for_test_nested.md

> Unwind loops > Separate test > For test nested
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  for (test of $({a: 1})) {}
}
`````

## Pre Normal

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  for (test of $({ a: 1 })) {
  }
}
`````

## Normalized

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1 };
  const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
  for (test of tmpForOfRhs) {
  }
}
`````

## Output

`````js filename=intro
let counter = 0;
let test = true;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  const tmpCalleeParam = { a: 1 };
  const tmpForOfRhs = $(tmpCalleeParam);
  for (test of tmpForOfRhs) {
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'yolo'
 - 2: { a: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
