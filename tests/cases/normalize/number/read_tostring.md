# Preval test case

# read_tostring.md

> Normalize > Number > Read tostring
>
> Reading the toString method from a number. We know what that is.

#TODO

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
const f = $NumberPrototype.toString;
$(f);
const tmpCallCallee = $;
const tmpCalleeParam = $coerce(f, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = $NumberPrototype.toString;
$(f);
$(`function(){}`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $NumberPrototype.toString;
$( a );
$( "function(){}" );
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

Final output calls: BAD!!
 - 1: '<function>'
 - 2: 'function() {return undefined;}'
 - eval returned: undefined
