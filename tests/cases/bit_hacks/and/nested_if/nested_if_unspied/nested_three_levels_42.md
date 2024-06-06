# Preval test case

# nested_three_levels_42.md

> Bit hacks > And > Nested if > Nested if unspied > Nested three levels 42
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 7-way options in a Set.

Something like `new Set([2, 8, 10, 32, 34, 40, 42]).has(n)`

#TODO

## Input

`````js filename=intro
const x = +$spy(42);
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
const x = +$spy(42);
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
const tmpUnaryArg = $spy(42);
const x = +tmpUnaryArg;
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
const tmpUnaryArg = $spy(42);
const x = +tmpUnaryArg;
const tmpIfTest = x & 10;
const tmpIfTest$1 = tmpIfTest === 10;
if (tmpIfTest$1) {
  const tmpIfTest$3 = x & 32;
  if (tmpIfTest$3) {
    $(`it is 42`);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 42 );
const b = +a;
const c = b & 10;
const d = c === 10;
if (d) {
  const e = b & 32;
  if (e) {
    $( "it is 42" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [42, 42]
 - 2: '$spy[1].valueOf()', 42
 - 3: 'it is 42'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
