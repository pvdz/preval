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
const tmpFree /*:()=>boolean*/ = function $free() {
  debugger;
  const y /*:number*/ = x & 32768;
  const tmpRet /*:boolean*/ = !y;
  return tmpRet;
};
const tmpUnaryArg = $(1);
const x /*:number*/ = +tmpUnaryArg;
const z /*:boolean*/ = $frfr(tmpFree);
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d & 32768;
  const e = !c;
  return e;
};
const f = $( 1 );
const d = +f;
const g = h( a );
$( g );
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
