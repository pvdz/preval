# Preval test case

# typeof.md

> normalize > unary > inv > typeof
>
> Typeof always returns a non-empty string so inverting it is always `false`

#TODO

## Input

`````js filename=intro
$(!void $(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(100);
const tmpUnaryArg = undefined;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = !undefined;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same