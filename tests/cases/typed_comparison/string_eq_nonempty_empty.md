# Preval test case

# string_eq_nonempty_empty.md

> Typed comparison > String eq nonempty empty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($('full'));
const y = x === '';
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = String($(`full`));
const y = x === ``;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(`full`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === ``;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(`full`);
const x /*:string*/ = $coerce(tmpStringFirstArg, `string`);
const y /*:boolean*/ = !x;
$(`out:`, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "full" );
const b = $coerce( a, "string" );
const c = !b;
$( "out:", c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'full'
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
