# Preval test case

# inv.md

> normalize > unary > typeof > inv
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof !$(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
!tmpUnaryArg;
const tmpCalleeParam = 'boolean';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
!tmpUnaryArg;
$('boolean');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'boolean'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
