# Preval test case

# useless_arg.md

> normalize > delete > useless_arg
>
> Delete on non-property is valid but useless

#TODO

## Input

`````js filename=intro
var foo = 1;
$(delete (null, foo));
$(typeof foo)
`````

## Normalized

`````js filename=intro
var foo;
foo = 1;
const tmpCallCallee = $;
null;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = typeof foo;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
var foo;
foo = 1;
const tmpCallCallee = $;
tmpCallCallee(true);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = typeof foo;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
