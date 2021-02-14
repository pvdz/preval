# Preval test case

# typeof.md

> normalize > unary > inv > typeof
>
> Typeof always returns a non-empty string so inverting it is always `false`

#TODO

## Input

`````js filename=intro
$(!typeof $(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg$1 = $(100);
const tmpUnaryArg = typeof tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg$1 = $(100);
const tmpUnaryArg = typeof tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
