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
var tmpArg;
var tmpUnaryArg;
var x;
x = 'foo';
tmpUnaryArg = $(x);
tmpArg = !tmpUnaryArg;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
var x;
x = 'foo';
tmpUnaryArg = $(x);
tmpArg = !tmpUnaryArg;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: true
 - 2: undefined

Normalized calls: Same

Final output calls: Same
