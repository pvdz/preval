# Preval test case

# base_two_levels_3.md

> Bit hacks > And > Nested if > Nested if unspied > Base two levels 3
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = +$spy(3);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````

## Pre Normal


`````js filename=intro
const x = +$spy(3);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $spy(3);
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
const tmpUnaryArg /*:unknown*/ = $spy(3);
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
const f = $spy( 3 );
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
 - 1: 'Creating spy', 1, 1, [3, 3]
 - 2: '$spy[1].valueOf()', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
