# Preval test case

# var_body.md

> Normalize > Try > Catch > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
} catch {
  var x;
}
`````

## Normalized

`````js filename=intro
var x;
try {
} catch {}
`````

## Output

`````js filename=intro
try {
} catch {}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same