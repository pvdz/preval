# Preval test case

# base_two_levels_2.md

> Bit hacks > And > Nested if > Nested if unspied > Base two levels 2
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = +$spy(2);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````

## Pre Normal


`````js filename=intro
const x = +$spy(2);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $spy(2);
const x = +tmpUnaryArg;
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
const tmpUnaryArg = $spy(2);
const x = +tmpUnaryArg;
const tmpIfTest = x & 10;
const tmpIfTest$1 = tmpIfTest === 10;
if (tmpIfTest$1) {
  $(`it is ten`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 2 );
const b = +a;
const c = b & 10;
const d = c === 10;
if (d) {
  $( "it is ten" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [2, 2]
 - 2: '$spy[1].valueOf()', 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
