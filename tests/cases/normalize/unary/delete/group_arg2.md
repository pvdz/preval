# Preval test case

# group_arg2.md

> Normalize > Unary > Delete > Group arg2
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
let foo = 1;
$(delete (null, foo));
$(typeof foo)
`````

## Pre Normal


`````js filename=intro
let foo = 1;
$(delete (null, foo));
$(typeof foo);
`````

## Normalized


`````js filename=intro
let foo = 1;
const tmpCalleeParam = true;
$(tmpCalleeParam);
const tmpCalleeParam$1 = typeof foo;
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(true);
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
$( "number" );
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
