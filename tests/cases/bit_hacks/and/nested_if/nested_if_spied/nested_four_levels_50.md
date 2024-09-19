# Preval test case

# nested_four_levels_50.md

> Bit hacks > And > Nested if > Nested if spied > Nested four levels 50
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 14-way options in a Set.

Something like `new Set([2, 8, 10, 16, 18, 24, 26, 32, 34, 40, 42, 48, 50, 60]).has(n)`

## Input

`````js filename=intro
const x = $spy(50);
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
const x = $spy(50);
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
const x = $spy(50);
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
const x = $spy(50);
const tmpIfTest /*:number*/ = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 /*:number*/ = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 /*:number*/ = x & 32;
    if (tmpIfTest$3) {
      const tmpIfTest$5 /*:number*/ = x & 16;
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

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 50 );
const b = a & 8;
if (b) {
  const c = a & 2;
  if (c) {
    const d = a & 32;
    if (d) {
      const e = a & 16;
      if (e) {
        $( "it is 58" );
      }
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [50, 50]
 - 2: '$spy[1].valueOf()', 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
