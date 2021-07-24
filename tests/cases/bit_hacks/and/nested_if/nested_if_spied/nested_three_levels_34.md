# Preval test case

# nested_three_levels_34.md

> Bit hacks > And > Nested if > Nested if spied > Nested three levels 34
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 7-way options in a Set.

Something like `new Set([2, 8, 10, 32, 34, 40, 42]).has(n)`

#TODO

## Input

`````js filename=intro
const x = $spy(34);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      $('it is 42');
    }
  }
}
`````

## Pre Normal

`````js filename=intro
const x = $spy(34);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      $(`it is 42`);
    }
  }
}
`````

## Normalized

`````js filename=intro
const x = $spy(34);
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 = x & 32;
    if (tmpIfTest$3) {
      $(`it is 42`);
    } else {
    }
  } else {
  }
} else {
}
`````

## Output

`````js filename=intro
const x = $spy(34);
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 = x & 32;
    if (tmpIfTest$3) {
      $(`it is 42`);
    } else {
    }
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [34, 34]
 - 2: '$spy[1].valueOf()', 34
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
