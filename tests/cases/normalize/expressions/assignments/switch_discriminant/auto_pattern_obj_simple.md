# Preval test case

# auto_pattern_obj_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto pattern obj simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a, b } = { a: 1, b: 2 };
$(a, b);
`````

## Pre Normal


`````js filename=intro
let { a: a, b: b } = { a: 1, b: 2 };
$(a, b);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 1, b: 2 };
let a = bindingPatternObjRoot.a;
let b = bindingPatternObjRoot.b;
$(a, b);
`````

## Output


`````js filename=intro
$(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
