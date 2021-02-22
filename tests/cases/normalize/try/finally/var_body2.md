# Preval test case

# var_body2.md

> Normalize > Try > Finally > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
} finally {
  var x = 10;
}
$(x);
`````

## Normalized

`````js filename=intro
var x;
try {
} finally {
  x = 10;
}
$(x);
`````

## Output

`````js filename=intro
var x;
try {
} finally {
  x = 10;
}
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