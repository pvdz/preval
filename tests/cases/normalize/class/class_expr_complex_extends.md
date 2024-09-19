# Preval test case

# class_expr_complex_extends.md

> Normalize > Class > Class expr complex extends
>
> Extends should be a simple node

## Input

`````js filename=intro
let a = class x extends $(String) {}
$(a, x);
`````

## Pre Normal


`````js filename=intro
let a = class x extends $(String) {};
$(a, x);
`````

## Normalized


`````js filename=intro
const tmpClassSuper = $(String);
let a = class x extends tmpClassSuper {};
$(a, x);
`````

## Output


`````js filename=intro
const tmpClassSuper = $(String);
const a /*:class*/ = class x extends tmpClassSuper {};
$(a, x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( String );
const b = class x  {

};
$( b, x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
