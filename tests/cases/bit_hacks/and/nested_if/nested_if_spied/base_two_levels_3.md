# Preval test case

# base_two_levels_3.md

> Bit hacks > And > Nested if > Nested if spied > Base two levels 3
>
> Nested ifs that check AND on same binding can be merged in some cases

#TODO

## Input

`````js filename=intro
const x = $spy(3);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````

## Pre Normal

`````js filename=intro
const x = $spy(3);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````

## Normalized

`````js filename=intro
const x = $spy(3);
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    $(`it is ten`);
  } else {
  }
} else {
}
`````

## Output

`````js filename=intro
const x = $spy(3);
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    $(`it is ten`);
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [3, 3]
 - 2: '$spy[1].valueOf()', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same