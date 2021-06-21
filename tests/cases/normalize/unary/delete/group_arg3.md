# Preval test case

# group_arg3.md

> Normalize > Unary > Delete > Group arg3
>
> Delete on non-property is valid but useless

#TODO

## Input

`````js filename=intro
var foo = 1;
$(delete (null, foo));
$(typeof foo)
`````

## Pre Normal

`````js filename=intro
let foo = undefined;
foo = 1;
$(delete (null, foo));
$(typeof foo);
`````

## Normalized

`````js filename=intro
let foo = undefined;
foo = 1;
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = typeof foo;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
$(true);
$(`number`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
