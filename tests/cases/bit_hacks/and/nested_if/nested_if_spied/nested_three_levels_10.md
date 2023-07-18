# Preval test case

# nested_three_levels_10.md

> Bit hacks > And > Nested if > Nested if spied > Nested three levels 10
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 7-way options in a Set.

Something like `new Set([2, 8, 10, 32, 34, 40, 42]).has(n)`

#TODO

## Input

`````js filename=intro
const x = $spy(10);
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
const x = $spy(10);
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
const x = $spy(10);
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
const x = $spy(10);
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

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 10 );
const b = a & 8;
if (b) {
  const c = a & 2;
  if (c) {
    const d = a & 32;
    if (d) {
      $( "it is 42" );
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [10, 10]
 - 2: '$spy[1].valueOf()', 10
 - 3: '$spy[1].valueOf()', 10
 - 4: '$spy[1].valueOf()', 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
