# Preval test case

# base.md

> Global casting > Boolean > Base
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const b = $('b');
const x = a === b;
const y = Boolean(x);
$(y);
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = a === b;
const y = Boolean(x);
$(y);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = a === b;
const y = Boolean(x);
$(y);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const b /*:unknown*/ = $(`b`);
const x /*:boolean*/ = a === b;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = a === b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
