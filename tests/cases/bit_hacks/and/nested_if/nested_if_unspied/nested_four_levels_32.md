# Preval test case

# nested_four_levels_32.md

> Bit hacks > And > Nested if > Nested if unspied > Nested four levels 32
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 14-way options in a Set.

Something like `new Set([2, 8, 10, 16, 18, 24, 26, 32, 34, 40, 42, 48, 50, 60]).has(n)`

#TODO

## Input

`````js filename=intro
const x = +$spy(32);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      if (x & 16) {
        $('it is 58');
      }
    }
  }
}
`````

## Pre Normal

`````js filename=intro
const x = +$spy(32);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      if (x & 16) {
        $(`it is 58`);
      }
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $spy(32);
const x = +tmpUnaryArg;
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 = x & 32;
    if (tmpIfTest$3) {
      const tmpIfTest$5 = x & 16;
      if (tmpIfTest$5) {
        $(`it is 58`);
      } else {
      }
    } else {
    }
  } else {
  }
} else {
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $spy(32);
const x = +tmpUnaryArg;
const tmpIfTest = x & 10;
const tmpIfTest$1 = tmpIfTest === 10;
if (tmpIfTest$1) {
  const tmpIfTest$3 = x & 48;
  const tmpIfTest$5 = tmpIfTest$3 === 48;
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [32, 32]
 - 2: '$spy[1].valueOf()', 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same