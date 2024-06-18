# Preval test case

# multiple_args.md

> Global casting > Number > Multiple args
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = +a;
const y = Number(x, 1, "twee");
$(y);
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const x = +a;
const y = Number(x, 1, `twee`);
$(y);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const x = +a;
const tmpArgOverflow = x;
const tmpStringFirstArg = tmpArgOverflow;
const y = $coerce(tmpStringFirstArg, `number`);
$(y);
`````

## Output


`````js filename=intro
const a = $(`a`);
const x = +a;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = +a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
