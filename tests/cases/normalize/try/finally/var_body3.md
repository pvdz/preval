# Preval test case

# var_body3.md

> Normalize > Try > Finally > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
} finally {
  var x;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
try {
} finally {
}
$(x);
`````

## Output

`````js filename=intro
try {
} finally {
}
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
