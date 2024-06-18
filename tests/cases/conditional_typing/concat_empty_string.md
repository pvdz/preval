# Preval test case

# concat_empty_string.md

> Conditional typing > Concat empty string
>
> Concatting an empty string to a known string is a noop

Like coercion but the type is already there.

## Input

`````js filename=intro
const x = String($('hello'));
const y = x + '';
const z = y + '';
$(z);
`````

## Pre Normal


`````js filename=intro
const x = String($(`hello`));
const y = x + ``;
const z = y + ``;
$(z);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(`hello`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = $coerce(x, `plustr`);
const z = $coerce(y, `plustr`);
$(z);
`````

## Output


`````js filename=intro
const tmpStringFirstArg = $(`hello`);
const x = $coerce(tmpStringFirstArg, `string`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
