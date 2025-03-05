# Preval test case

# and_neq_n_true.md

> Bit hacks > And x if > And neq n true
>
> Meh

## Input

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y !== 32768; // false
$(z);
`````

## Pre Normal


`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y !== 32768;
$(z);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = y !== 32768;
$(z);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>boolean*/ = function $free($$0) {
  const x$1 /*:number*/ = $$0;
  debugger;
  const y /*:number*/ = x$1 & 32768;
  const tmpRet /*:boolean*/ = !y;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $(1);
const x /*:number*/ = +tmpUnaryArg;
const z /*:boolean*/ = $frfr(tmpFree, x);
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c & 32768;
  const e = !d;
  return e;
};
const f = $( 1 );
const g = +f;
const h = i( a, g );
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
