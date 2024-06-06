# Preval test case

# global_call_prop.md

> Normalize > Nullish > Global call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)??foo);
`````

## Pre Normal


`````js filename=intro
$(parseInt(15) ?? foo);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = 15;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = foo;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(15);
`````

## PST Output

With rename=true

`````js filename=intro
$( 15 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
