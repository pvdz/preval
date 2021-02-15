# Preval test case

# double_bang_sequence.md

> normalize > unary > inv > double_bang_sequence
>
> This is an example of a double bang that can be moved into a sequence

#TODO

## Input

`````js filename=intro
var x;
$(!!((x = 'foo'), $(x)));
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
x = 'foo';
const tmpUnaryArg$1 = $(x);
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = 'foo';
const tmpUnaryArg$1 = $(x);
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
