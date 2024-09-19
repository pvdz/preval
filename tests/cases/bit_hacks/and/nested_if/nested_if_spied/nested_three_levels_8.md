# Preval test case

# nested_three_levels_8.md

> Bit hacks > And > Nested if > Nested if spied > Nested three levels 8
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 7-way options in a Set.

Something like `new Set([2, 8, 10, 32, 34, 40, 42]).has(n)`

## Input

`````js filename=intro
const x = $spy(8);
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
const x = $spy(8);
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
const x = $spy(8);
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
const x = $spy(8);
const tmpIfTest /*:number*/ = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 /*:number*/ = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 /*:number*/ = x & 32;
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
const a = $spy( 8 );
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
 - 1: 'Creating spy', 1, 1, [8, 8]
 - 2: '$spy[1].valueOf()', 8
 - 3: '$spy[1].valueOf()', 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
