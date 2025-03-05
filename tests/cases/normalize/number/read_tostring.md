# Preval test case

# read_tostring.md

> Normalize > Number > Read tostring
>
> Reading the toString method from a number. We know what that is.

## Input

`````js filename=intro
const f = (31).toString;
$(f);
$(f + '');
`````

## Pre Normal


`````js filename=intro
const f = (31).toString;
$(f);
$(f + ``);
`````

## Normalized


`````js filename=intro
const f = $Number_prototype.toString;
$(f);
const tmpCalleeParam = $coerce(f, `plustr`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$($number_toString);
$(`function toString() { [native code] }`);
`````

## PST Output

With rename=true

`````js filename=intro
$( $number_toString );
$( "function toString() { [native code] }" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
