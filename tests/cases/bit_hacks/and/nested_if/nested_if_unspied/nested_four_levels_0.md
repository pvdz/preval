# Preval test case

# nested_four_levels_0.md

> Bit hacks > And > Nested if > Nested if unspied > Nested four levels 0
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 14-way options in a Set.

Something like `new Set([2, 8, 10, 16, 18, 24, 26, 32, 34, 40, 42, 48, 50, 60]).has(n)`

## Input

`````js filename=intro
const x = +$spy(0);
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
const x = +$spy(0);
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
const tmpUnaryArg = $spy(0);
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
const tmpFree$1 /*:()=>boolean*/ = function $free() {
  debugger;
  const tmpIfTest /*:number*/ = x & 10;
  const tmpRet$1 /*:boolean*/ = tmpIfTest === 10;
  return tmpRet$1;
};
const tmpFree /*:()=>boolean*/ = function $free() {
  debugger;
  const tmpIfTest$3 /*:number*/ = x & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  return tmpRet;
};
const tmpUnaryArg = $spy(0);
const x /*:number*/ = +tmpUnaryArg;
const tmpIfTest$1 /*:boolean*/ = $frfr(tmpFree$1);
if (tmpIfTest$1) {
  const tmpIfTest$5 /*:boolean*/ = $frfr(tmpFree);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d & 10;
  const e = c === 10;
  return e;
};
const f = function b() {
  debugger;
  const g = d & 48;
  const h = g === 48;
  return h;
};
const i = $spy( 0 );
const d = +i;
const j = k( a );
if (j) {
  const l = k( f );
  if (l) {
    $( "it is 58" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
