# Preval test case

# var_body3.md

> Normalize > Try > Catch > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
} catch {
  var x;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
try {
} catch {}
$(x);
`````

## Output

`````js filename=intro
try {
} catch {}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
