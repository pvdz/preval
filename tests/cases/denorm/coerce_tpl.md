# Preval test case

# coerce_tpl.md

> Denorm > Coerce tpl
>
>

## Input

`````js filename=intro
const x = $coerce(val, 'plustr');
const y = `(${x})`;
$(y);
`````

## Pre Normal


`````js filename=intro
const x = $coerce(val, `plustr`);
const y = `(` + $coerce(x, `string`) + `)`;
$(y);
`````

## Normalized


`````js filename=intro
const x = $coerce(val, `plustr`);
const tmpBinBothLhs = `(`;
const tmpBinBothRhs = $coerce(x, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const y = `${tmpStringConcatR})`;
$(y);
`````

## Output


`````js filename=intro
const x /*:string*/ = $coerce(val, `plustr`);
const y /*:string*/ = `(${x})`;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $coerce( val, "plustr" );
const b = `(${a})`;
$( b );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
$(`(${val})`);
`````

## Globals

BAD@! Found 1 implicit global bindings:

val

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
