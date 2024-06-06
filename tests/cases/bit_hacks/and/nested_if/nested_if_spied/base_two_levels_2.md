# Preval test case

# base_two_levels_2.md

> Bit hacks > And > Nested if > Nested if spied > Base two levels 2
>
> Nested ifs that check AND on same binding can be merged in some cases

#TODO

## Input

`````js filename=intro
const x = $spy(2);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````

## Pre Normal


`````js filename=intro
const x = $spy(2);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````

## Normalized


`````js filename=intro
const x = $spy(2);
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
const x = $spy(2);
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

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 2 );
const b = a & 8;
if (b) {
  const c = a & 2;
  if (c) {
    $( "it is ten" );
  }
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
