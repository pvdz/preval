# Preval test case

# dupe.md

> Free > Dupe
>
> This case was injecting double expression at some point

## Input

`````js filename=intro
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const tmpIfTest$3 = x & 48;
  const tmpIfTest$5 = tmpIfTest$3 === 48;
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {}
} else {}
`````

## Pre Normal


`````js filename=intro
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const tmpIfTest$3 = x & 48;
  const tmpIfTest$5 = tmpIfTest$3 === 48;
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const tmpIfTest$3 = x & 48;
  const tmpIfTest$5 = tmpIfTest$3 === 48;
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
const tmpFree /*:()=>boolean*/ = function $free() {
  debugger;
  const tmpIfTest$3 /*:number*/ = x & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  return tmpRet;
};
const tmpUnaryArg = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
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
  const c = d & 48;
  const e = c === 48;
  return e;
};
const f = $spy( 1 );
const d = +f;
if (d) {
  const g = h( a );
  if (g) {
    $( "it is 58" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
