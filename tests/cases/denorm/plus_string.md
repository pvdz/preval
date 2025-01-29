# Preval test case

# plus_string.md

> Denorm > Plus string
>
>

When a + b when a is known to be a string then b will be coerced to a string regardless so we can make it `${a}${b}` instead and simplify.

This is not as safe for `b + a` because of evaluation order and the potential of observable side effects.

## Input

`````js filename=intro
const a = tmpForInNext.value;
const b = a;
const c = `; ${b}`;
const d = c + e;
$(d);
`````

## Pre Normal


`````js filename=intro
const a = tmpForInNext.value;
const b = a;
const c = `; ` + $coerce(b, `string`) + ``;
const d = c + e;
$(d);
`````

## Normalized


`````js filename=intro
const a = tmpForInNext.value;
const b = a;
const tmpBinBothLhs = `; `;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const c = $coerce(tmpBinLhs, `plustr`);
const d = c + e;
$(d);
`````

## Output


`````js filename=intro
const a = tmpForInNext.value;
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpBinLhs /*:string*/ = `; ${tmpBinBothRhs}`;
const d /*:string*/ = tmpBinLhs + e;
$(d);
`````

## PST Output

With rename=true

`````js filename=intro
const a = tmpForInNext.value;
const b = $coerce( a, "string" );
const c = `; ${b}`;
const d = c + e;
$( d );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
$(`; ${tmpForInNext.value}` + e);
`````

## Globals

BAD@! Found 2 implicit global bindings:

tmpForInNext, e

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
