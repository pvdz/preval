# Preval test case

# var_body2.md

> Normalize > For > Forof > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n;
for (n of tmpForOfDeclRhs) {
  x = n;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n;
for (n of tmpForOfDeclRhs) {
  x = n;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
