# Preval test case

# double_bang_sequence.md

> normalize > unary > inv > double_bang_sequence
>
> This is an example of a double bang that can be moved into a sequence

#TODO

## Input

`````js filename=intro
var x;
$(!((x = 'foo'), $(x)));
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
x = 'foo';
const tmpUnaryArg = $(x);
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var x;
x = 'foo';
const tmpUnaryArg = $(x);
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
