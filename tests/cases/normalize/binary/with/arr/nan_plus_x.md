# Preval test case

# nan_plus_x.md

> Normalize > Binary > With > Arr > Nan plus x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  [] + x,
];
$(arr);
`````

## Pre Normal


`````js filename=intro
const x = $spy();
const arr = [[] + x];
$(arr);
`````

## Normalized


`````js filename=intro
const x = $spy();
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs + x;
const arr = [tmpArrElement];
$(arr);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:string*/ = $coerce(x, `plustr`);
const arr /*:array*/ = [tmpArrElement];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "plustr" );
const c = [ b ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: ['12345']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
