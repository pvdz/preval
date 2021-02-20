# Preval test case

# literal.md

> Normalize > Member access > Statement > Global > Literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
'foo'.length;
`````

## Normalized

`````js filename=intro
'foo'.length;
`````

## Output

`````js filename=intro
'foo'.length;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
