# Preval test case

# num_stmt.md

> Normalize > Expressions > Num stmt
>
> A statement that is a num coercion

#TODO

## Input

`````js filename=intro
+$spy();
`````

## Pre Normal


`````js filename=intro
+$spy();
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $spy();
+tmpUnaryArg;
`````

## Output


`````js filename=intro
const tmpUnaryArg = $spy();
+tmpUnaryArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
+a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
