# Preval test case

# single_bang_sequence.md

> Normalize > Unary > Inv > Single bang sequence
>
> This is an example of a single bang that can be moved into a sequence

## Input

`````js filename=intro
var x;
$(!((x = 'foo'), $(x)));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(!((x = `foo`), $(x)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = `foo`;
const tmpUnaryArg = $(x);
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(`foo`);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
const b = !a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
