# Preval test case

# var_body.md

> Normalize > For > Forof > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
`````

## Normalized

`````js filename=intro
var x;
const tmpForOfDeclRhs = [1, 2, 3];
let n;
for (n of tmpForOfDeclRhs) {
  x = n;
}
`````

## Output

`````js filename=intro
const tmpForOfDeclRhs = [1, 2, 3];
let n;
for (n of tmpForOfDeclRhs) {
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
