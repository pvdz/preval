# Preval test case

# single_bang_sequence.md

> Normalize > Unary > Inv > Single bang sequence
>
> This is an example of a single bang that can be moved into a sequence

#TODO

## Input

`````js filename=intro
var x;
$(!((x = 'foo'), $(x)));
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpCallCallee = $;
x = 'foo';
const tmpUnaryArg = $(x);
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $('foo');
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
