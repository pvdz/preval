# Preval test case

# multiple_args_implicit_global.md

> Global casting > Boolean > Multiple args implicit global
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const b = $('b');
const x = a === b;
const y = Boolean(x, $, 1, fail_hard, "twee");
$(y);
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = a === b;
const y = Boolean(x, $, 1, fail_hard, `twee`);
$(y);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = a === b;
const tmpArgOverflow = x;
fail_hard;
const y = Boolean(tmpArgOverflow);
$(y);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const b /*:unknown*/ = $(`b`);
fail_hard;
const x /*:boolean*/ = a === b;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
fail_hard;
const c = a === b;
$( c );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_hard

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
