# Preval test case

# class_expr_named.md

> Normalize > Class > Class expr named
>
> Class expression base

#TODO

## Input

`````js filename=intro
let a = class x {}
$(a, x);
`````

## Pre Normal

`````js filename=intro
let a = class x {};
$(a, x);
`````

## Normalized

`````js filename=intro
let a = class x {};
$(a, x);
`````

## Output

`````js filename=intro
const a = class x {};
$(a, x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = class x  {

};
$( a, x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
