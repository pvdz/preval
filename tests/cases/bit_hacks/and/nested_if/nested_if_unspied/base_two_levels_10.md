# Preval test case

# base_two_levels_10.md

> Bit hacks > And > Nested if > Nested if unspied > Base two levels 10
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = +$spy(10);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````

## Pre Normal


`````js filename=intro
const x = +$spy(10);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $spy(10);
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
const tmpFree /*:()=>boolean*/ = function $free() {
  debugger;
  const tmpIfTest /*:number*/ = x & 10;
  const tmpRet /*:boolean*/ = tmpIfTest === 10;
  return tmpRet;
};
const tmpUnaryArg = $spy(10);
const x /*:number*/ = +tmpUnaryArg;
const tmpIfTest$1 /*:boolean*/ = $frfr(tmpFree);
if (tmpIfTest$1) {
  $(`it is ten`);
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
const f = $spy( 10 );
const d = +f;
const g = h( a );
if (g) {
  $( "it is ten" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [10, 10]
 - 2: '$spy[1].valueOf()', 10
 - 3: 'it is ten'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
