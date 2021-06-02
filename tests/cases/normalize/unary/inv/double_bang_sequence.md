# Preval test case

# double_bang_sequence.md

> Normalize > Unary > Inv > Double bang sequence
>
> This is an example of a double bang that can be moved into a sequence

#TODO

## Input

`````js filename=intro
var x;
$(!!((x = 'foo'), $(x)));
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$(!!((x = 'foo'), $(x)));
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpCallCallee = $;
x = 'foo';
const tmpUnaryArg$1 = $(x);
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg$1 = $('foo');
const tmpCalleeParam = Boolean(tmpUnaryArg$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
