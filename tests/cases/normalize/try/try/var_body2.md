# Preval test case

# var_body2.md

> Normalize > Try > Try > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
  var x = 10;
} catch {

}
$(x);
`````

## Normalized

`````js filename=intro
var x;
try {
  x = 10;
} catch {}
$(x);
`````

## Output

`````js filename=intro
var x;
try {
  x = 10;
} catch {}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same